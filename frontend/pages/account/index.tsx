import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, mixed } from 'yup';

import StyledForm from '../../components/styles/StyledForm';
import { CURRENT_USER_QUERY } from '../../gql/queries';
import { useEffect } from 'react';
import { UPDATE_USER_MUTATION } from '../../gql/mutations';

type FormInputs = {
	name: string;
	phone: string;
	photo: string;
	zipCode: string;
	address: string;
	houseNumber: string;
	addOn: string;
	city: string;
	neighbourhood: string;
	state: string;
};

const schema = object({
	name: string().required(),
	photo: mixed().required('You need to provide a file').default(undefined),
}).required();

const Account = () => {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<FormInputs>({
		resolver: yupResolver(schema),
	});

	const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
	const user = data?.authenticatedItem;

	const [updateUser, { data: updatedUser, loading: updatingUser }] =
		useMutation(UPDATE_USER_MUTATION, {
			variables: {
				id: user?.id,
				name: user?.name,
				phone: user?.phone,
				photo: user?.photo,
				zipCode: user?.zipCode,
				address: user?.address,
				houseNumber: user?.houseNumber,
				addOn: user?.addOn,
				city: user?.city,
				neighbourhood: user?.neighbourhood,
				state: user?.state,
			},
			onCompleted: data => {
				console.log({ data });
			},
			onError: error => {
				console.error(error);
			},
		});

	const onSubmit = async (data: FormInputs) => {
		console.log(data);
		// TODO: Handle mutations
	};

	useEffect(() => {
		console.log({ data });
		console.log({ user });
	}, [data]);

	return (
		<div>
			<div style={{ height: '200px' }}></div>
			<StyledForm onSubmit={handleSubmit(onSubmit)}>
				<h3>User Information</h3>
				<fieldset
					//  disabled={loading}
					// aria-busy={loading}
					disabled={false}
					aria-busy={false}
				>
					<label
						style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
						htmlFor="full-name"
					>
						Full Name (First and Last)
						<input
							{...register('name')}
							id="full-name"
							type="text"
							placeholder="Name"
						/>
					</label>
					<label
						style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
						htmlFor="phone"
					>
						Phone
						<input
							{...register('phone')}
							id="phone"
							type="text"
							placeholder="+55 11 99999-9999"
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
					<h3>Address information</h3>
					<fieldset></fieldset>
					<label
						style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
						htmlFor="zip-code"
					>
						Zip Code
						<input
							{...register('zipCode')}
							id="zip-code"
							type="text"
							placeholder="Ex: 00000-000"
						/>
					</label>
					<label
						style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
						htmlFor="address"
					>
						Address
						<input
							{...register('address')}
							id="address"
							type="text"
							placeholder="Address"
						/>
					</label>
					<label
						style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
						htmlFor="house-number"
					>
						House No.
						<input
							{...register('houseNumber')}
							id="house-number"
							type="text"
							placeholder="Street / House number"
						/>
					</label>
					<label
						style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
						htmlFor="add-on"
					>
						Add-on (optional)
						<input
							{...register('addOn')}
							id="add-on"
							type="text"
							placeholder="Apartment, suite, unit, building, floor, etc."
						/>
					</label>
					<label
						style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
						htmlFor="neighbourhood"
					>
						Neighbourhood
						<input
							{...register('neighbourhood')}
							id="neighbourhood"
							type="text"
							placeholder="Insert your Neighbourhood"
						/>
					</label>
					<label
						style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
						htmlFor="city"
					>
						City
						<input
							{...register('city')}
							id="city"
							type="text"
							placeholder="Insert your City"
						/>
					</label>
					<label
						style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
						htmlFor="state"
					>
						State
						<input
							{...register('state')}
							id="state"
							type="text"
							placeholder="Insert your State"
						/>
					</label>

					<button type="submit">+ Update User</button>
				</fieldset>
			</StyledForm>
		</div>
	);
};

export default Account;
