import React, { ReactNode } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from 'components/UserComponent';

interface IDeleteProduct {
	id: String;
	children?: ReactNode;
}

const StyledButtonLink = styled.button`
	color: #393939;
	&:hover {
		cursor: pointer;
		text-decoration: underline;
	}
`;

const update = (cache: any, payload: any) => {
	cache.evict(cache.identify(payload.data.deleteProduct));
};

const ADD_TO_CART_MUTATION = gql`
	mutation ADD_TO_CART_MUTATION($id: ID!) {
		addToCart(productId: $id) {
			id
		}
	}
`;

const AddToCartButton = ({ id, children }: IDeleteProduct) => {
	const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
		variables: { id },
		refetchQueries: [{ query: CURRENT_USER_QUERY }],
	});

	return (
		<StyledButtonLink
			type="button"
			disabled={loading}
			onClick={() => addToCart()}
		>
			{children ? children : undefined}
		</StyledButtonLink>
	);
};

export default AddToCartButton;
