import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import StyledForm from './styles/StyledForm';
import useForm from '../hooks/useForm';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from '../hooks/useUserQuery';
import { EventProps, SignInFormInputProps } from '../types/commonTypes';

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
	const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
		variables: inputs,
		refetchQueries: [{ query: CURRENT_USER_QUERY }],
	});

	// TODO: Proper Error Handling
	async function handleSubmit(e: EventProps) {
		e.preventDefault();
		await signin();
		resetForm();
		Router.push({
			pathname: `/products/1`,
		});
	}
	const error =
		data?.authenticateUserWithPassword.__typename ===
		'UserAuthenticationWithPasswordFailure'
			? data?.authenticateUserWithPassword
			: undefined;
	return (
		<>
			{loading && <p>Loading...</p>}
			<StyledForm method="POST" onSubmit={handleSubmit}>
				<h2>Sign Into Your Account</h2>
				<Error error={error} />
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
					<button type="submit">Sign In!</button>
				</fieldset>
			</StyledForm>
		</>
	);
};

export default SignIn;
