import { useState } from 'react';
import { ApolloError, useMutation, gql } from '@apollo/client';
import Router from 'next/router';

import StyledForm from './styles/StyledForm';
import useForm from '../hooks/useForm';
import { CURRENT_USER_QUERY } from '../hooks/useUserQuery';
import { EventProps, SignInFormInputProps } from '../@types/commonTypes';
import Error from './error/ErrorMessage';
import { LoadingSpinner } from './loading';

const SIGNIN_MUTATION = gql`
	mutation SIGNIN_MUTATION($email: String!, $password: String!) {
		authenticateUserWithPassword(email: $email, password: $password) {
			... on UserAuthenticationWithPasswordSuccess {
				item {
					id
					email
					name
				}
			}
			... on UserAuthenticationWithPasswordFailure {
				message
			}
		}
	}
`;

const SignIn = () => {
	const { inputs, handleChange, resetForm } = useForm<SignInFormInputProps>({
		email: '',
		password: '',
	});
	const [error, setError] = useState<ApolloError | null | undefined>(null);
	const [message, setMessage] = useState<string | null>(null);

	const [signin, { loading }] = useMutation(SIGNIN_MUTATION, {
		variables: inputs,
		refetchQueries: [{ query: CURRENT_USER_QUERY }],
		onCompleted: data => {
			if (
				data?.authenticateUserWithPassword?.message !==
					'Authentication failed.' ||
				data?.authenticateUserWithPassword.__typename !==
					'UserAuthenticationWithPasswordFailure'
			) {
				Router.push({
					pathname: '/products/1',
				});
				resetForm();
			} else {
				setError(data?.authenticateUserWithPassword);
			}
		},
		onError: error => {
			console.error(error);
			setError(error);
			resetForm();
		},
	});

	async function handleSubmit(e: EventProps) {
		setMessage('');
		e.preventDefault();
		if (inputs.email === '' || inputs.password === '') {
			setMessage('Please fill in all fields.');
			setError(null);
			return;
		}
		setMessage(null);
		await signin();
	}

	return (
		<>
			<StyledForm
				method="POST"
				onSubmit={handleSubmit}
				autoComplete="new-password"
			>
				<h2>Sign Into Your Account</h2>
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
					<label htmlFor="password">
						Password
						<input
							type="password"
							name="password"
							placeholder="Password"
							// autoComplete="password"
							autoComplete="new-password"
							value={inputs.password}
							onChange={handleChange}
						/>
					</label>
					<button type="submit">Sign In!</button>
					{message && <p>{message}</p>}
					{loading && <LoadingSpinner />}
				</fieldset>
			</StyledForm>
		</>
	);
};

export default SignIn;
