import styled from 'styled-components';
import { loadStripe, StripeError } from '@stripe/stripe-js';
import {
	CardElement,
	Elements,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import nProgress from 'nprogress';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Router, useRouter } from 'next/dist/client/router';
import StyledButton from './styles/StyledButton';
import useCartState from '../hooks/useCartState';
import { CURRENT_USER_QUERY } from '../hooks/useUserQuery';
import { EventProps } from '../types/commonTypes';

const CheckoutFormStyles = styled.form`
	box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
	border: 1px solid rgba(0, 0, 0, 0.06);
	border-radius: 5px;
	padding: 1rem;
	display: grid;
	grid-gap: 1rem;
`;

const CREATE_ORDER_MUTATION = gql`
	mutation CREATE_ORDER_MUTATION($token: String!) {
		checkout(token: $token) {
			id
			charge
			total
			items {
				id
				name
			}
		}
	}
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || '');

const CheckoutForm = () => {
	const [error, setError] = useState<StripeError | null>(null);
	// TODO: loading UX
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
	const handleSubmit = async (e: EventProps) => {
		e.preventDefault();
		setLoading(true);
		nProgress.start();

		// FIXME: Handle this squigly lines
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements?.getElement(CardElement) || { token: '' },
		});

		console.log(paymentMethod);
		console.log(error);

		if (error) {
			setError(error);
			nProgress.done();
			return;
		}

		const order = await checkout({
			variables: {
				token: paymentMethod?.id,
			},
		});

		console.log(`Finished with the order!!`);
		console.log(order);

		// 6. Change the page to view the order
		router.push({
			pathname: `/order/[id]`,
			query: {
				id: order.data.checkout.id,
			},
		});

		closeCart();
		setLoading(false);
		nProgress.done();
	};

	return (
		<CheckoutFormStyles onSubmit={handleSubmit}>
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
