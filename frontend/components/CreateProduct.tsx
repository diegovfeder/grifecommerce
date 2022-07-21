import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import ErrorMessage from './ErrorMessage';
import StyledForm from './styles/StyledForm';
import useForm from '../hooks/useForm';
import { EventProps, ProductFormInputProps } from '../types/commonTypes';
import ALL_PRODUCTS_QUERY from '../gql/queryAllProducts.gql';
import { CREATE_PRODUCT_MUTATION } from '../gql/mutations';

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
			refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
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
