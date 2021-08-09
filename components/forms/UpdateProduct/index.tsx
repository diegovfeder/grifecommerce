import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import ErrorMessage from 'components/ErrorMessage';
import StyledForm from 'components/styled/StyledForm';
import useForm from 'hooks/useForm';
import { IEvent, IProductFormInput } from 'types/commonTypes';
import ProductComponent from 'components/ProductComponent';

interface IUpdateProduct {
	id: String;
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

const UpdateProduct = ({ id }: IUpdateProduct) => {
	// 1. Get the existing product
	const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
		variables: { id },
	});
	const router = useRouter();

	// 2. Mutation to update product
	const [updateProduct, updateMutation] = useMutation(UPDATE_PRODUCT_MUTATION);

	// 3. A form to handle the update
	const { inputs, handleChange, clearForm } = useForm<IProductFormInput>(
		data?.Product || {
			name: '',
			description: '',
			price: '',
		},
	);

	if (loading) return <p>Loading...</p>;

	// const productData = {
	// 	id: '',
	// 	name: '',
	// 	price: 0,
	// 	description: '',
	// 	photo: {
	// 		image: {
	// 			publicUrlTransformed: '',
	// 		},
	// 	},
	// };

	return (
		<>
			{/* {console.log('re-render')} */}
			{/* {console.log({ data })} */}
			{/* <ProductComponent key={data.Product.id} product={productData} /> */}

			<StyledForm
				onSubmit={async (e: IEvent) => {
					e.preventDefault();
					// Submit inputFields to backend
					// TODO: Type the following (res) const.
					// Think about this way: If the updateProduct mutation is returning something
					// I'd like to safely check using code, or at least know what it is...
					const res = await updateProduct({
						variables: {
							id,
							name: inputs.name,
							description: inputs.description,
							price: inputs.price,
						},
					}).catch(error => console.error({ error }));
					// TODO: If res responds success show something to the user?...
					// console.table(res);
					clearForm(); // only when succesful?
					router.push({
						pathname: `/product/${res?.data?.updateProduct?.id}`,
					});
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
};

export default UpdateProduct;
