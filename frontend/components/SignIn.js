import gql from 'graphql-tag';
import Router from 'next/router';
import { useMutation } from '@apollo/client';
import StyledForm from './styles/StyledForm';
import useForm from '../utils/useForm';
import { CURRENT_USER_QUERY } from '../hooks/useUserQuery';
import Error from './ErrorMessage';

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

export default function SignIn() {
	const { inputs, handleChange, resetForm } = useForm({
		email: '',
		password: '',
	});
	const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
		variables: inputs,
		refetchQueries: [{ query: CURRENT_USER_QUERY }],
	});

	// TODO: Proper Error Handling
	async function handleSubmit(e) {
		e.preventDefault();
		await signin();
		resetForm();
		Router.push({
			pathname: `/products`,
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
}