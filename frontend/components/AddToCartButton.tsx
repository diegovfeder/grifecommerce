import { ReactNode } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { CURRENT_USER_QUERY } from '../hooks/useUserQuery';
import { StyledButtonLink } from './styles/StyledButtonLink';

interface AddToCartButtonProps {
	id: String;
	children?: ReactNode;
}

export const ADD_TO_CART_MUTATION = gql`
	mutation ADD_TO_CART_MUTATION($id: ID!) {
		addToCart(productId: $id) {
			id
		}
	}
`;

const AddToCartButton = ({ id, children }: AddToCartButtonProps) => {
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
			{children}
		</StyledButtonLink>
	);
};

export default AddToCartButton;
