import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { loadStripe, PaymentMethod, StripeError } from '@stripe/stripe-js';
import {
	CardElement,
	Elements,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import { useRouter } from 'next/dist/client/router';
import useCartState from '../hooks/useCartState';
import styled from 'styled-components';
import nProgress from 'nprogress';
import StyledButton from './styles/StyledButton';
import { EventProps } from '../types/commonTypes';
import { CREATE_ORDER_MUTATION } from '../gql/mutations';
import { CURRENT_USER_QUERY } from '../gql/queries';
import LoadingLabel from './loading/LoadingLabel';

const CheckoutFormStyles = styled.form`
	box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
	border: 1px solid rgba(0, 0, 0, 0.06);
	border-radius: 5px;
	padding: 1rem;
	display: grid;
	grid-gap: 1rem;
`;

const stripeLib = loadStripe(process.env.STRIPE_PUBLISHABLE || '');

const CheckoutForm = () => {
	const [error, setError] = useState<StripeError | null>(null);
	const [loading, setLoading] = useState(false);
	const stripe = useStripe();
	const elements = useElements();
	const router = useRouter();
	const { closeCart } = useCartState();
	const [checkout, { error: graphQLError }] = useMutation(
		CREATE_ORDER_MUTATION,
		{
			refetchQueries: [{ query: CURRENT_USER_QUERY }],
		},
	);

	useEffect(() => {
		if (loading) {
			nProgress.start();
			return;
		}
		nProgress.done();
	});

	const handleSubmit = async (e: EventProps) => {
		e.preventDefault();
		setLoading(true);
		// nProgress.start();

		if (elements) {
			const cardElement = elements.getElement(CardElement);
			if (cardElement) {
				const createPaymentMethodResult = await stripe?.createPaymentMethod({
					type: 'card',
					card: cardElement,
				});
				const error: StripeError | null | undefined =
					createPaymentMethodResult?.error;
				const paymentMethod: PaymentMethod | undefined =
					createPaymentMethodResult?.paymentMethod;
				console.log(error);
				console.log(paymentMethod);

				if (error) {
					setError(error);
					setLoading(false);
					// nProgress.done();
					return;
				}

				const order = await checkout({
					variables: {
						token: paymentMethod?.id,
					},
				});
				console.log(`Finished with the order!!`);
				console.log(order);

				// TODO: Wait for the order to be created?..
				router.push({
					pathname: `/order/[id]`,
					query: {
						id: order.data.checkout.id,
					},
				});

				closeCart();
				setLoading(false);
				// nProgress.done();
			}
		} else {
		}
	};

	return (
		<CheckoutFormStyles onSubmit={handleSubmit}>
			{loading && <LoadingLabel />}
			{error && <p style={{ fontSize: 12 }}>{error.message}</p>}
			{graphQLError && <p style={{ fontSize: 12 }}>{graphQLError.message}</p>}
			<CardElement />
			<StyledButton>Check Out Now</StyledButton>
		</CheckoutFormStyles>
	);
};

const Checkout = () => {
	return (
		<Elements stripe={stripeLib}>
			<CheckoutForm />
		</Elements>
	);
};

export { Checkout };
