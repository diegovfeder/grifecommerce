import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
// import ErrorMessage from 'components/ErrorMessage';
// import StyledForm from 'components/styled/StyledForm';
// import useForm from 'hooks/useForm';
// import Router from 'next/router';

// FIXME:Should this component only run stuff and route to a success page?
// ... or refresh and fetch new data.

// FIXME: Also, do I need a state // reducer, or something here???
// ... or can apollo be my guy for that?

interface IDeleteProduct {
	id: String;
	children?: React.ReactNode;
}

// TODO: Create a Type / Typings folder to gather common interfaces
// interface IEvent {
// 	preventDefault: () => void;
// }

// Q: Should I really type this? as it's coming from gql (apollo) and should be already typed and also I don't have control of their props
// A: Yes. We don't know if their API is going to change someday. We should check this behaviour and even test it
const update = (cache: any, payload: any) => {
	cache.evict(cache.identify(payload.data.deleteProduct));
};

const DELETE_PRODUCT_MUTATION = gql`
	mutation DELETE_PRODUCT_MUTATION($id: ID!) {
		deleteProduct(id: $id) {
			id
			name
		}
	}
`;

function DeleteProduct({ id, children }: IDeleteProduct) {
	// 1. Mutation to DELETE product
	const [deleteProduct, deleteMutationState] = useMutation(
		DELETE_PRODUCT_MUTATION,
		{
			variables: { id },
			update,
		},
	);

	if (deleteMutationState.loading) return <p>Loading...</p>;

	// TODO: Is there a chance of passing id = undefined here? If yes what happens
	// TODO: Style this button with onHover effect, maybe change the confirm web default modal to a custom
	// get modal example from aurora project or next/js lib?... maybe icn
	return (
		<button
			type="button"
			disabled={deleteMutationState.loading}
			onClick={() => {
				if (confirm('Are you sure you want to delete this item?')) {
					// go ahead and delete it...
					deleteProduct().catch(console.error);
				}
			}}
		>
			{children ? children : undefined}
		</button>
	);
}

export default DeleteProduct;
