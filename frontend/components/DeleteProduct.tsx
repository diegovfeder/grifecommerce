import { ReactNode } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { StyledButtonLink } from './styles/StyledButtonLink';

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

	return (
		<StyledButtonLink
			type="button"
			disabled={deleteMutationState.loading}
			onClick={() => {
				if (confirm('Are you sure you want to delete this item?')) {
					deleteProduct().catch(console.error);
				}
			}}
		>```
			{children}
		</StyledButtonLink>
	);
};

export default DeleteProduct;
