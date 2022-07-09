import { useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import StyledForm from './styles/StyledForm';
import useForm from '../hooks/useForm';
import ErrorMessage from './ErrorMessage';
import { EventProps, SignUpFormInputProps } from '../types/commonTypes';
import { SIGN_UP_MUTATION } from '../gql/mutations';
import LoadingLabel from './loading/LoadingLabel';

const SignUp = () => {
	const [error, setError] = useState<ApolloError | null>(null);
	const { inputs, handleChange, resetForm } = useForm<SignUpFormInputProps>({
		email: '',
		name: '',
		password: '',
	});

	const [signup, { loading, data }] = useMutation(SIGN_UP_MUTATION, {
		variables: inputs,
		onError: err => {
			// console.error(err);
			setError(err);
		},
		// TODO: refectch the currently logged in user
		// refetchQueries: [{ query: CURRENT_USER_QUERY }],
	});

	const handleSubmit = async (e: EventProps) => {
		e.preventDefault();
		await signup().catch(console.error);
		resetForm();
	};

	if (loading) {
		<LoadingLabel />;
	}
	if (error) return <ErrorMessage error={error} />;

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
						type="password"
						name="password"
						placeholder="Password"
						autoComplete="password"
						value={inputs.password}
						onChange={handleChange}
					/>
				</label>
				<button type="submit">Sign Up!</button>
				{data?.createUser && (
					<p>
						Signed up with {data.createUser.email} - Please Go Head and Sign in!
					</p>
				)}
				{data?.createUser === undefined && <p>Error</p>}
			</fieldset>
		</StyledForm>
	);
};

export default SignUp;
