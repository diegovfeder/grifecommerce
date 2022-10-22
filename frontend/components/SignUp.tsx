import { useState } from 'react';
import { useMutation } from '@apollo/client';

import StyledForm from './styles/StyledForm';
import useForm from '../hooks/useForm';
import { EventProps, SignUpFormInputProps } from '../types/commonTypes';
import { SIGN_UP_MUTATION } from '../gql/mutations';
import { CURRENT_USER_QUERY } from '../gql/queries';
import { LoadingSpinner } from './loading';
import ErrorMessage from './error/ErrorMessage';

const SignUp = () => {
	const { inputs, handleChange, resetForm } = useForm<SignUpFormInputProps>({
		email: '',
		name: '',
		password: '',
	});
	const [message, setMessage] = useState<string | null>(null);

	const [signup, { loading, error }] = useMutation(SIGN_UP_MUTATION, {
		variables: inputs,
		refetchQueries: [{ query: CURRENT_USER_QUERY }],
		onCompleted: () => {
			setMessage('Account created successfully!');
			resetForm();
		},
		onError: error => {
			console.error(error);
		},
	});

	const handleSubmit = async (e: EventProps) => {
		setMessage('');
		e.preventDefault();
		if (inputs.email === '' || inputs.name === '' || inputs.password === '') {
			setMessage('Please fill in all fields.');
			return;
		}
		setMessage(null);
		await signup({
			variables: {
				email: inputs.email,
				name: inputs.name,
				password: inputs.password,
			},
		});
	};

	return (
		<>
			<StyledForm
				method="POST"
				onSubmit={handleSubmit}
				autoComplete="new-password"
			>
				<h2>Sign Up For an Account</h2>
				<ErrorMessage error={error} />
				<fieldset>
					<label htmlFor="email">
						Name
						<input
							aria-label="name"
							type="text"
							name="name"
							placeholder="Your Name"
							// autoComplete="name"
							autoComplete="new-password"
							value={inputs.name}
							onChange={handleChange}
						/>
					</label>
					<label htmlFor="email">
						Email
						<input
							aria-label="email"
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
							aria-label="password"
							type="password"
							name="password"
							placeholder="Password"
							// autoComplete="password"
							autoComplete="new-password"
							value={inputs.password}
							onChange={handleChange}
						/>
					</label>
					<button type="submit">Sign Up!</button>
					{message && <p>{message}</p>}
					{loading && <LoadingSpinner />}
				</fieldset>
			</StyledForm>
		</>
	);
};

export default SignUp;
