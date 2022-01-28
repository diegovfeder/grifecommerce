import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from '../hooks/useUserQuery';

interface RemoveFromCartButtonProps {
	id: String;
}

const REMOVE_FROM_CART_MUTATION = gql`
	mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
		deleteCartItem(where: { id: $id }) {
			id
		}
	}
`;

// TODO: Properly type cache and payload
function update(cache: any, payload: any) {
	cache.evict(cache.identify(payload.data.deleteCartItem));
}

const RemoveFromCartButton = ({ id }: RemoveFromCartButtonProps) => {
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
			onClick={() => removeFromCart()}
			disabled={loading}
			type="button"
			title="Remove This Item from Cart"
		>
			&times;
		</StyledButton>
	);
};

const StyledButton = styled.button`
	font-size: 3rem;
	background: none;
	border: 0;
	&:hover {
		color: var(--red);
		cursor: pointer;
	}
`;

export default RemoveFromCartButton;
