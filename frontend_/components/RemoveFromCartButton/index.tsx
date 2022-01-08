import React, { ReactNode } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from 'components/UserComponent';

interface IRemoveFromCartButton {
	id: String;
}

const StyledButton = styled.button`
	font-size: 3rem;
	background: none;
	border: 0;
	&:hover {
		color: var(--red);
		cursor: pointer;
	}
`;

const REMOVE_FROM_CART_MUTATION = gql`
	mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
		deleteCartItem(where: { id: $id }) {
			id
		}
	}
`;

const update = (cache: any, payload: any) => {
	cache.evict(cache.identify(payload.data.deleteCartItem));
};

const RemoveFromCartButton = ({ id }: IRemoveFromCartButton) => {
	const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
		variables: { id },
		update,
		optimisticResponse: {
			__typename: 'CartItem',
			id,
		},
		refetchQueries: [{ query: CURRENT_USER_QUERY }],
	});

	return (
		<StyledButton
			type="button"
			title="Remove this item from cart"
			disabled={loading}
			onClick={() => removeFromCart()}
		>
			&times;
		</StyledButton>
	);
};

export default RemoveFromCartButton;
