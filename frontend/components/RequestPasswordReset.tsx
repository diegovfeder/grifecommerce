import { useState } from 'react';
import { ApolloError, useLazyQuery, useMutation } from '@apollo/client';
import Error from './ErrorMessage';
import StyledForm from './styles/StyledForm';
import useForm from '../hooks/useForm';
import {
	EventProps,
	RequestPasswordResetFormInputProps,
} from '../types/commonTypes';
import { VERIFY_USER_EMAIL_QUERY } from '../gql/queries';
import { SEND_USER_PASSWORD_RESET_LINK_MUTATION } from '../gql/mutations';
import { IUserModel } from '../types/commonTypes';

const RequestPasswordReset = () => {
	const [error, setError] = useState<ApolloError>();
	const [userEmailExists, setUserEmailExists] = useState<boolean>(true);
	const [verifyUserEmail, { loading: userLoading }] = useLazyQuery(
		VERIFY_USER_EMAIL_QUERY,
		{
			onCompleted: async (data: { user: IUserModel | null }) => {
				if (data.user === null) {
					setUserEmailExists(false);
					return;
				}
				setUserEmailExists(true);
				await sendUserPasswordResetLink();
			},
			onError: err => {
				setError(err);
			},
		},
	);

	const { inputs, handleChange, resetForm } =
		useForm<RequestPasswordResetFormInputProps>({
			email: '',
		});

	const [sendUserPasswordResetLink, { data, loading }] = useMutation(
		SEND_USER_PASSWORD_RESET_LINK_MUTATION,
		{
			variables: { email: inputs.email },
			onCompleted: (data: { sendUserPasswordResetLink: boolean }) => {
				setUserEmailExists(true);
				if (data.sendUserPasswordResetLink) {
					resetForm();
				}
			},
			onError: err => {
				setError(err);
			},
		},
	);

	const handleSubmit = async (e: EventProps) => {
		e.preventDefault();
		if (inputs.email === '') {
			return;
		}
		await verifyUserEmail({ variables: { email: inputs.email } });
	};

	return (
		<StyledForm method="POST" onSubmit={handleSubmit}>
			<h2>Request a Password Reset</h2>
			<fieldset>
				<label htmlFor="email">
					Email
					<input
						type="email"
						name="email"
						placeholder="Your Email Address"
						autoComplete="email"
						value={inputs.email}
						onChange={handleChange}
					/>
				</label>
				<button type="submit" disabled={loading}>
					Request Reset!
				</button>
				{(loading || userLoading) && <p>Loading...</p>}
				{!userEmailExists && <p>Email not found...</p>}
				{data?.sendUserPasswordResetLink && (
					<p>Success! Check your email for a link!</p>
				)}
				<Error error={error} />
			</fieldset>
		</StyledForm>
	);
};

export default RequestPasswordReset;
