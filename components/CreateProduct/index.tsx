import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import Router from 'next/router';
import useForm from 'hooks/useForm';
import ErrorMessage from 'components/ErrorMessage';
import StyledForm from 'components/styled/StyledForm';
import { Container } from './styles';
import { ALL_PRODUCTS_QUERY } from 'components/ProductsGridComponent';
import { IProductFormInput } from 'types/commonTypes';

interface IEvent {
	preventDefault: () => void;
}

const CREATE_PRODUCT_MUTATION = gql`
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
			name
			description
			price
		}
	}
`;

const CreateProduct = () => {
	const { inputs, handleChange, clearForm } = useForm<IProductFormInput>({
		name: '',
		description: '',
		price: undefined,
		image: '',
	});

	const [createProduct, { loading, error, data }] = useMutation(
		CREATE_PRODUCT_MUTATION,
		{
			variables: inputs,
			refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
		},
	);

	const onSubmit = async (e: IEvent) => {
		e.preventDefault();
		// Submit inputFields to backend
		const res = await createProduct();
		clearForm();
		// Go to that product's page!
		Router.push({
			pathname: `/product/${res.data.createProduct.id}`,
		});
	};

	return (
		<Container>
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
					<label htmlFor="image">
						Image
						<input
							type="file"
							id="image"
							name="image"
							onChange={handleChange}
						/>
					</label>
					<button type="submit">+ Add Product</button>
				</fieldset>
			</StyledForm>
		</Container>
	);
};

export default CreateProduct;
