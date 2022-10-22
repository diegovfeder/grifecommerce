import { ReactNode } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';

interface DeleteProductProps {
	id: string | undefined;
	children?: ReactNode;
}

const DELETE_PRODUCT_MUTATION = gql`
	mutation DELETE_PRODUCT_MUTATION($id: ID!) {
		deleteProduct(id: $id) {
			id
			name
		}
	}
`;

// TODO: Properly type cache and payload
function update(cache: any, payload: any) {
	cache.evict(cache.identify(payload.data.deleteProduct));
}

const DeleteProduct = ({ id, children }: DeleteProductProps) => {
	const [deleteProduct, deleteMutationState] = useMutation(
		DELETE_PRODUCT_MUTATION,
		{
			variables: { id },
			update,
		},
	);

	// TODO: Style these buttons better.
	return (
		<StyledButtonLink
			type="button"
			disabled={deleteMutationState.loading}
			onClick={() => {
				if (confirm('Are you sure you want to delete this item?')) {
					deleteProduct().catch(console.error);
				}
			}}
		>
			{children}
		</StyledButtonLink>
	);
};

const StyledButtonLink = styled.button`
	color: #393939;
	&:hover {
		cursor: pointer;
		text-decoration: underline;
	}
`;

export default DeleteProduct;
