import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import ErrorMessage from './ErrorMessage';
import { PRODUCTS_QUERY } from './ProductsGridComponent';
import StyledForm from './styles/StyledForm';
import useForm from '../hooks/useForm';
import { EventProps, ProductFormInputProps } from '../types/commonTypes';

export const CREATE_PRODUCT_MUTATION = gql`
	mutation CREATE_PRODUCT_MUTATION(
		$name: String!
		$description: String!
		$price: Int!
		$image: Upload
	) {
		createProduct(
			data: {
				name: $name
				description: $description
				price: $price
				status: "AVAILABLE"
				photo: { create: { image: $image, altText: $name } }
			}
		) {
			id
			price
			descriptio
			name
		}
	}
`;

const CreateProduct = () => {
	const { inputs, handleChange, clearForm } = useForm<ProductFormInputProps>({
		name: '',
		description: '',
		price: 0,
		image: '',
	});

	const [createProduct, { loading, error }] = useMutation(
		CREATE_PRODUCT_MUTATION,
		{
			variables: inputs,
			refetchQueries: [{ query: PRODUCTS_QUERY }],
		},
	);

	const onSubmit = async (e: EventProps) => {
		e.preventDefault();
		const res = await createProduct();
		clearForm();
		Router.push({
			pathname: `/product/${res.data.createProduct.id}`,
		});
	};

	return (
		<StyledForm onSubmit={onSubmit}>
			<ErrorMessage error={error} />
			<fieldset disabled={loading} aria-busy={loading}>
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
						placeholder="price"
						value={inputs.price}
						onChange={handleChange}
					/>
				</label>
				<label htmlFor="image">
					Image
					<input
						required
						type="file"
						id="image"
						name="image"
						onChange={handleChange}
					/>
				</label>
				<button type="submit">+ Add Product</button>
			</fieldset>
		</StyledForm>
	);
};

export default CreateProduct;