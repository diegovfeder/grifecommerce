import { ApolloError, useMutation } from '@apollo/client';
import StyledForm from './styles/StyledForm';
import ErrorMessage from './ErrorMessage';
import useForm from '../hooks/useForm';
import { EventProps, SignUpFormInputProps } from '../types/commonTypes';
import { SIGN_UP_MUTATION } from '../gql/mutations';
import { CURRENT_USER_QUERY } from '../gql/queries';
import { useState } from 'react';

const SignUp = () => {
	const [message, setMessage] = useState<string | null>(null);
	const { inputs, handleChange, resetForm } = useForm<SignUpFormInputProps>({
		email: '',
		name: '',
		password: '',
	});

	const [signup, { data, error }] = useMutation(SIGN_UP_MUTATION, {
		variables: inputs,
		refetchQueries: [{ query: CURRENT_USER_QUERY }],
	});

	const handleSubmit = async (e: EventProps) => {
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
		resetForm();
	};

	// TODO: Change UX: After SignIn, route directly to Home
	return (
		<StyledForm method="POST" onSubmit={handleSubmit}>
			<h2>Sign Up For an Account</h2>
			<fieldset>
				<label htmlFor="email">
					Name
					<input
						aria-label="name"
						type="text"
						name="name"
						placeholder="Your Name"
						autoComplete="name"
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
						autoComplete="email"
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
						autoComplete="password"
						value={inputs.password}
						onChange={handleChange}
					/>
				</label>
				<button type="submit">Sign Up!</button>
				{message && <p>{message}</p>}
				{data?.createUser && (
					<p>
						Signed Up with {data.createUser.email} - Please Go Ahead and Sign
						In!
					</p>
				)}
				<ErrorMessage error={error} />
			</fieldset>
		</StyledForm>
	);
};

export default SignUp;
