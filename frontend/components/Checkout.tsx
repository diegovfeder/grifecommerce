import nProgress from 'nprogress';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import { loadStripe, PaymentMethod, StripeError } from '@stripe/stripe-js';
import {
	CardElement,
	Elements,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';

import StyledButton from './styles/StyledButton';
import useCartState from '../hooks/useCartState';
import { EventProps } from '../types/commonTypes';
import { CREATE_ORDER_MUTATION } from '../gql/mutations';
import { CURRENT_USER_QUERY } from '../gql/queries';
import { LoadingSpinner } from './loading';

const stripeLib = loadStripe(process.env.STRIPE_PUBLISHABLE || '');

const CheckoutForm = () => {
	const router = useRouter();
	const stripe = useStripe();
	const elements = useElements();

	const { closeCart } = useCartState();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<StripeError | null>(null);

	const [checkout, { error: graphQLError }] = useMutation(
		CREATE_ORDER_MUTATION,
		{
			refetchQueries: [{ query: CURRENT_USER_QUERY }],
			onCompleted: data => {
				console.log({ data });
				setLoading(false);
			},
			onError: error => {
				console.error({ error });
				setLoading(false);
			},
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
		nProgress.start();

		if (elements) {
			const cardElement = elements.getElement(CardElement);
			if (cardElement) {
				const createPaymentMethodResult = await stripe?.createPaymentMethod({
					type: 'card',
					card: cardElement,
				});

				const error: StripeError | null | undefined =
					createPaymentMethodResult?.error;

				if (error) {
					console.error(error);
					setError(error);
					setLoading(false);
					nProgress.done();
					return;
				}

				const paymentMethod: PaymentMethod | undefined =
					createPaymentMethodResult?.paymentMethod;
				console.log(paymentMethod);

				const order = await checkout({
					variables: {
						token: paymentMethod?.id,
					},
				});

				console.log(`Finished with the order!`);
				console.log(order);

				// TODO: Wait for the order to be created?..
				// await orderResult

				if (order) {
					// TODO:
				}

				setLoading(false);
				nProgress.done();
				closeCart();

				router.push({
					pathname: `/order/[id]`,
					query: {
						id: order.data.checkout.id,
					},
				});
			}
		} else {
			// ???
		}
	};

	// TODO: Style CardElement (make text bigger, make form stand out more)
	return (
		<CheckoutFormStyles onSubmit={handleSubmit}>
			{error && <p style={{ fontSize: 12 }}>{error.message}</p>}
			{graphQLError && <p style={{ fontSize: 12 }}>{graphQLError.message}</p>}
			<CardElement />
			<StyledButton>
				{loading && <LoadingSpinner />}
				Check Out Now
			</StyledButton>
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

const CheckoutFormStyles = styled.form`
	box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
	border: 1px solid rgba(0, 0, 0, 0.06);
	border-radius: 5px;
	padding: 1rem;
	display: grid;
	grid-gap: 1rem;
`;

export default Checkout;
