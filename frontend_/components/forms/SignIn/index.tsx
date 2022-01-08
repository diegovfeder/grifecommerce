import { gql, useMutation } from '@apollo/client';
import Router from 'next/router';
import useForm from 'hooks/useForm';
import StyledForm from 'components/styled/StyledForm';
import ErrorMessage from 'components/ErrorMessage';
import { CURRENT_USER_QUERY } from 'components/UserComponent';
import { IEvent, ISignInFormInput } from 'types/commonTypes';

const SIGN_IN_MUTATION = gql`
	mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
		authenticateUserWithPassword(email: $email, password: $password) {
			... on UserAuthenticationWithPasswordSuccess {
				item {
					id
					email
					name
				}
			}
			... on UserAuthenticationWithPasswordFailure {
				code
				message
			}
		}
	}
`;

const SignIn = () => {
	const { inputs, handleChange, resetForm } = useForm<ISignInFormInput>({
		email: '',
		password: '',
	});

	const [signin, { data }] = useMutation(SIGN_IN_MUTATION, {
		variables: inputs,
		refetchQueries: [{ query: CURRENT_USER_QUERY }],
	});

	// TODO: Proper Error Handling
	const handleSubmit = async (e: IEvent) => {
		e.preventDefault();
		await signin().catch(console.error);
		resetForm();
		Router.push({
			pathname: `/`,
		});
	};

	const error =
		data?.authenticateUserWithPassword?.__typename ===
		'UserAuthenticationWithPasswordFailure'
			? data?.authenticateUserWithPassword
			: undefined;

	return (
		<StyledForm method="POST" onSubmit={handleSubmit}>
			<h2>Sign Into Your Account</h2>
			<ErrorMessage error={error} />
			<fieldset>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					name="email"
					placeholder="Your Email Address"
					autoComplete="email"
					value={inputs.email}
					onChange={handleChange}
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					placeholder="Password"
					autoComplete="password"
					value={inputs.password}
					onChange={handleChange}
				/>
				<button type="submit">Sign In!</button>
			</fieldset>
		</StyledForm>
	);
};

export default SignIn;
