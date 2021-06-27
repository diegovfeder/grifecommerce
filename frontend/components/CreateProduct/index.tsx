import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';
import useForm from 'hooks/useForm';
import StyledForm from 'components/styles/StyledForm';
import ErrorMessage from 'components/ErrorMessage';
import { Container } from './styles';

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

function CreateProduct() {
	const { inputs, handleChange, clearForm, resetForm } = useForm({
		name: '',
		price: undefined,
		description: '',
	});

	const [createProduct, { loading, error, data }] = useMutation(
		CREATE_PRODUCT_MUTATION,
		{
			variables: inputs,
			// refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
		},
	);

	return (
		<Container>
			<StyledForm
				onSubmit={async (e: { preventDefault: () => void }) => {
					e.preventDefault();
					console.log(inputs);
					// Submit inputFields to backend
					const res = await createProduct();
					clearForm();
					// Router.push({
					//   pathname: `/product/${res.data.createProduct.id}`,
					// });
				}}
			>
				<ErrorMessage error={error} />
				<fieldset disabled={loading} aria-busy={loading}>
					<label htmlFor="name">
						Image
						<input
							type="file"
							id="image"
							name="image"
							onChange={handleChange}
						/>
					</label>
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
							placeholder="description"
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
					<button type="submit">+ Add Product</button>
				</fieldset>
			</StyledForm>
		</Container>
	);
}

export default CreateProduct;
