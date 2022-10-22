import { useState, useEffect } from 'react';
import { ApolloError, useLazyQuery, useMutation } from '@apollo/client';

import StyledForm from './styles/StyledForm';
import useForm from '../hooks/useForm';
import {
	EventProps,
	RequestPasswordResetFormInputProps,
} from '../types/commonTypes';
import { USER_EMAIL_QUERY } from '../gql/queries';
import { SEND_USER_PASSWORD_RESET_LINK_MUTATION } from '../gql/mutations';
import { LoadingSpinner } from './loading';
import Error from './error/ErrorMessage';

const RequestPasswordReset = () => {
	const { inputs, handleChange, resetForm } =
		useForm<RequestPasswordResetFormInputProps>({
			email: '',
		});
	const [message, setMessage] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<ApolloError>();

	const [verifyUserEmail, { loading: loadingVerifyUserQuery }] = useLazyQuery(
		USER_EMAIL_QUERY,
		{
			variables: inputs,
			onCompleted: async data => {
				if (!data?.user?.email) {
					setMessage('Email not found...');
					return;
				}
				setLoading(true);
				await sendUserPasswordResetLink({
					variables: { email: data.user.email },
				});
			},
			onError: err => {
				console.error(err);
				setError(err);
			},
		},
	);

	const [sendUserPasswordResetLink, { loading: loadingResetLinkMutation }] =
		useMutation(SEND_USER_PASSWORD_RESET_LINK_MUTATION, {
			variables: inputs,
			onCompleted: (data: { sendUserPasswordResetLink: boolean }) => {
				setLoading(false);
				if (data.sendUserPasswordResetLink) {
					setMessage('Password reset link sent!');
					resetForm();
				}
			},
			onError: err => {
				setLoading(false);
				console.error(err);
				setError(err);
			},
		});

	useEffect(() => {
		if (loadingVerifyUserQuery || loadingResetLinkMutation) {
			setLoading(true);
		}
	}, [loadingVerifyUserQuery, loadingResetLinkMutation]);

	const handleSubmit = async (e: EventProps) => {
		setMessage('');
		e.preventDefault();
		if (inputs.email === '') {
			setMessage('Please fill in all fields.');
			return;
		}
		await verifyUserEmail({ variables: { email: inputs.email } });
	};

	return (
		<StyledForm
			method="POST"
			onSubmit={handleSubmit}
			autoComplete="new-password"
		>
			<h2>Request a Password Reset</h2>
			<Error error={error} />
			<fieldset>
				<label htmlFor="email">
					Email
					<input
						type="email"
						name="email"
						placeholder="Your Email Address"
						// autoComplete="email"
						autoComplete="new-password"
						value={inputs.email}
						onChange={handleChange}
					/>
				</label>
				<button type="submit">Request Reset!</button>
				{message && <p>{message}</p>}
				{loading && <LoadingSpinner />}
			</fieldset>
		</StyledForm>
	);
};

export default RequestPasswordReset;
