import { useMutation } from '@apollo/client';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, number, mixed } from 'yup';

import {
	CREATE_PRODUCT_IMAGE_MUTATION,
	// CREATE_PRODUCT_MUTATION,
} from '../gql/mutations';
// import ALL_PRODUCTS_QUERY from '../gql/queryAllProducts.gql';
import ErrorMessage from './error/ErrorMessage';
import StyledForm from './styles/StyledForm';

type FormInputs = {
	name: string;
	description: string;
	price: number;
	photo: FileList;
};

const schema = object({
	name: string().required(),
	description: string().optional(),
	price: number().positive().integer().required(),
	photo: mixed().default(undefined),
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

	const [createProductImage, { loading, error }] = useMutation(
		CREATE_PRODUCT_IMAGE_MUTATION,
		{
			// FIXME:
			// refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
			onCompleted: data => {
				console.log({ data });
				reset();
				Router.push({
					pathname: `/product/${data?.createProduct?.id || ''}`,
				});
			},
			onError: err => {
				console.error({ err });
			},
		},
	);

	const onSubmit = async (form: FormInputs) => {
		console.log({ form });

		let imageString = '';

		const reader = new FileReader();
		reader.onloadend = () => {
			console.log({ reader });
			imageString = reader.result as string;
		};
		reader.readAsDataURL(form.photo[0]);

		console.log({ imageString });

		const productImage = await createProductImage({
			variables: {
				image: imageString,
				altText: form.name,
				product: {
					name: form.name,
					description: form.description,
					price: form.price,
					// photo: {
					// 	connect: {
					// 		id: productImage?.data?.createProductImage?.id || '',
					// 	},
					// },
					status: 'AVAILABLE',
				},
			},
		});

		console.log({ productImage });
	};

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			<h2>Sell Product</h2>
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
						required
						id="name"
						type="text"
						placeholder="Insert a name for your product"
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
						placeholder={`Insert a description for this product:\n\n- Year\n - Color\n - Size\n - Condition`}
					/>
				</label>
				<label
					style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
					htmlFor="price"
				>
					Price
					<input
						{...register('price')}
						required
						id="price"
						type="number"
						placeholder="Insert a price value"
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
						placeholder="Photo"
						accept="image/*"
					/>
				</label>
				<button type="submit">+ Add Product</button>
			</fieldset>
		</StyledForm>
	);
};

export default CreateProduct;
