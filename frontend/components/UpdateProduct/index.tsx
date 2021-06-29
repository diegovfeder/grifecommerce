import React from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import ErrorMessage from 'components/ErrorMessage';
import StyledForm from 'components/styled/StyledForm';
import useForm from 'hooks/useForm';
// import Router from 'next/router';

interface IUpdateProduct {
	id: String;
}

// TODO: Create a Type / Typings folder to gather common interfaces
interface IEvent {
	preventDefault: () => void;
}

const SINGLE_PRODUCT_QUERY = gql`
	query SINGLE_PRODUCT_QUERY($id: ID!) {
		Product(where: { id: $id }) {
			id
			name
			description
			price
		}
	}
`;

const UPDATE_PRODUCT_MUTATION = gql`
	mutation UPDATE_PRODUCT_MUTATION(
		$id: ID!
		$name: String
		$description: String
		$price: Int
	) {
		updateProduct(
			id: $id
			data: { name: $name, description: $description, price: $price }
		) {
			id
			name
			description
			price
		}
	}
`;

function UpdateProduct({ id }: IUpdateProduct) {
	// 1. Get the existing product
	const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
		variables: { id },
	});

	// 2. Mutation to update product
	const [updateProduct, updateMutation] = useMutation(UPDATE_PRODUCT_MUTATION);

	// 3. A form to handle the update
	const { inputs, handleChange, clearForm, resetForm } = useForm(
		data?.Product || {
			name: '',
			description: '',
			price: '',
		},
	);

	if (loading) return <p>Loading...</p>;

	return (
		<>
			<StyledForm
				onSubmit={async (e: IEvent) => {
					e.preventDefault();
					// TODO: Handle Submit!!!
					// Submit inputFields to backend
					const res = await updateProduct({
						variables: {
							id,
							name: inputs.name,
							description: inputs.description,
							price: inputs.price,
						},
					}).catch(console.error);
					clearForm();
					// Go to that product's page!
					// Router.push({
					// 	pathname: `/product/${res.data.createProduct.id}`,
					// });
				}}
			>
				<ErrorMessage error={error || updateMutation.error} />
				<fieldset
					disabled={updateMutation.loading}
					aria-busy={updateMutation.loading}
				>
					<label htmlFor="name">
						Name
						<input
							type="text"
							id="name"
							name="name"
							placeholder="Name"
							value={inputs.name}
							onChange={handleChange}
						/>
					</label>
					<label htmlFor="description">
						Description
						<input
							type="text"
							id="description"
							name="description"
							placeholder="Description"
							value={inputs.description}
							onChange={handleChange}
						/>
					</label>
					<label htmlFor="price">
						Price
						<input
							type="number"
							id="price"
							name="price"
							placeholder="Price"
							value={inputs.price}
							onChange={handleChange}
						/>
					</label>
					<button type="submit">Update Product</button>
				</fieldset>
			</StyledForm>
		</>
	);
}

export default UpdateProduct;
