import React from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import ErrorMessage from './ErrorMessage';
import useForm from '../hooks/useForm';
import StyledForm from './styles/StyledForm';
import { EventProps, ProductFormInputProps } from '../types/commonTypes';
import LoadingLabel from './loading/LoadingLabel';
import { UPDATE_PRODUCT_MUTATION } from '../gql/mutations';

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

const UpdateProductComponent = ({ id }: EditProductProps) => {
	const {
		data,
		loading: queryLoading,
		error: queryError,
	} = useQuery(PRODUCT_QUERY, {
		variables: { id },
	});
	const router = useRouter();

	const onMutationComplete = (data: any) => {
		console.log({ data });
	};

	const [
		updateProductMutation,
		{ loading: mutationLoading, error: mutationError },
	] = useMutation(UPDATE_PRODUCT_MUTATION);

	const { inputs, handleChange, clearForm } = useForm<ProductFormInputProps>(
		data?.product || {
			name: '',
			description: '',
			price: '',
		},
	);

	const handleSubmit = async (e: EventProps) => {
		e.preventDefault();
		const res = await updateProductMutation({
			variables: {
				id,
				...inputs,
			},
			onCompleted: onMutationComplete,
		});
		// TODO: Update UX: When success, show something as feedback to the user
		clearForm();
		router.push(`/product/${res.data.updateProduct.id}`);
	};

	if (queryLoading || mutationLoading) return <LoadingLabel />;

	if (queryError || mutationError)
		return <ErrorMessage error={queryError || mutationError} />;

	return (
		<StyledForm onSubmit={handleSubmit}>
			<fieldset disabled={mutationLoading} aria-busy={mutationLoading}>
				<label
					style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
					htmlFor="name"
				>
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
				<label
					style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
					htmlFor="description"
				>
					Description
					<textarea
						id="description"
						name="description"
						placeholder="Description"
						value={inputs.description}
						onChange={handleChange}
					/>
				</label>
				<label
					style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
					htmlFor="price"
				>
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
	);
};

export default UpdateProductComponent;
