import React from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import ErrorMessage from './ErrorMessage';
import useForm from '../hooks/useForm';
import StyledForm from './styles/StyledForm';
import { EventProps, ProductFormInputProps } from '../types/commonTypes';

interface EditProductProps {
	id: String;
}

const PRODUCT_QUERY = gql`
	query PRODUCT_QUERY($id: ID!) {
		product(where: { id: $id }) {
			id
			name
			description
			price
		}
	}
`;

const EDIT_PRODUCT_MUTATION = gql`
	mutation EDIT_PRODUCT_MUTATION(
		$id: ID!
		$name: String
		$description: String
		$price: Int
	) {
		updateProduct(
			where: { id: $id }
			data: { name: $name, description: $description, price: $price }
		) {
			id
			name
			description
			price
		}
	}
`;

const EditProduct = ({ id }: EditProductProps) => {
	const { loading, data, error } = useQuery(PRODUCT_QUERY, {
		variables: { id },
	});
	const router = useRouter();

	const [editProduct, editMutation] = useMutation(EDIT_PRODUCT_MUTATION);

	const { inputs, handleChange, clearForm } = useForm<ProductFormInputProps>(
		data?.Product || {
			name: '',
			description: '',
			price: '',
		},
	);

	if (loading) return <p>loading...</p>;

	return (
		<StyledForm
			onSubmit={async (e: EventProps) => {
				e.preventDefault();
				const res = await editProduct({
					variables: {
						id,
						name: inputs.name,
						description: inputs.description,
						price: inputs.price,
					},
				}).catch(console.error);
				// TODO: Update UX: When success, show something as feedback to the user
				clearForm();
				router.push({
					pathname: `/product/${res?.data?.updateProduct?.id}`,
				});
			}}
		>
			<ErrorMessage error={error || editMutation.error} />
			<fieldset
				disabled={editMutation.loading}
				aria-busy={editMutation.loading}
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
					<textarea
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
				<button type="submit">Edit Product</button>
			</fieldset>
		</StyledForm>
	);
};

export default EditProduct;
