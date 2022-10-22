import { useMutation } from '@apollo/client';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, number, mixed } from 'yup';

import { CREATE_PRODUCT_MUTATION } from '../gql/mutations';
import ALL_PRODUCTS_QUERY from '../gql/queryAllProducts.gql';
import StyledForm from './styles/StyledForm';
import ErrorMessage from './error/ErrorMessage';

type FormInputs = {
	name: string;
	description: string;
	price: number;
	photo: string;
};

const schema = object({
	name: string().required(),
	description: string().optional(),
	price: number().positive().integer().required(),
	photo: mixed().required('You need to provide a file').default(undefined),
}).required();

const CreateProduct = () => {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<FormInputs>({
		resolver: yupResolver(schema),
	});

	const [createProductImage] = useMutation(CREATE_PRODUCT_MUTATION, {
		variables: {
			image: '',
			altText: 'test',
		},
		onCompleted: data => {
			console.log({ data });
		},
		onError: err => {
			console.error({ err });
		},
	});

	const [createProduct, { loading, error }] = useMutation(
		CREATE_PRODUCT_MUTATION,
		{
			variables: {
				name: 'Cool Shoes',
				description: 'These are the coolest shoes',
				price: 5000,
				photo: {
					image: 'cool-shoes.jpg',
					altText: 'Cool Shoes',
				},
				status: 'AVAILABLE',
			},
			refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
			onCompleted: data => {
				console.log({ data });
				reset();
				// Router.push({
				// 	pathname: `/product/${data?.createProduct?.id || ''}`,
				// });
			},
			onError: err => {
				console.error({ err });
			},
		},
	);

	// FIXME:
	const onSubmit = async (data: FormInputs) => {
		console.log(data);
		// const productImage = await createProductImage({
		// 	variables: {
		// 		image: data.photo,
		// 		altText: data.name,
		// 		// product: probably create product first? but pass in the id
		// 	},
		// });
		// console.log({ productImage });

		const product = await createProduct({
			variables: {
				name: data.name,
				description: data.description,
				price: data.price,
				photo: {
					image: data.photo[0],
					altText: data.name,
				},
				status: 'AVAILABLE',
			},
		});
		console.log({ product });
	};

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			<ErrorMessage error={error} />
			{errors.photo && <p>{errors.photo.message}</p>}
			<fieldset disabled={loading} aria-busy={loading}>
				<label
					style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
					htmlFor="name"
				>
					Name
					<input
						{...register('name')}
						id="name"
						type="text"
						placeholder="Name"
					/>
				</label>
				<label
					style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
					htmlFor="description"
				>
					Description
					<textarea
						{...register('description')}
						id="description"
						placeholder="Description"
					/>
				</label>
				<label
					style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
					htmlFor="price"
				>
					Price
					<input
						{...register('price')}
						id="price"
						type="number"
						placeholder="price"
					/>
				</label>
				<label
					style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
					htmlFor="photo"
				>
					Photo
					<input
						{...register('photo')}
						id="photo"
						type="file"
						placeholder="photo"
						accept=".jpg, .png, .gif, .jpeg"
					/>
				</label>

				<button type="submit">+ Add Product</button>
			</fieldset>
		</StyledForm>
	);
};

export default CreateProduct;
