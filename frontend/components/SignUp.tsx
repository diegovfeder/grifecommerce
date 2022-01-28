import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import StyledForm from './styles/StyledForm';
import useForm from '../hooks/useForm';
import ErrorMessage from './ErrorMessage';
import { EventProps, SignUpFormInputProps } from '../types/commonTypes';

const SIGNUP_MUTATION = gql`
	mutation SIGNUP_MUTATION(
		$email: String!
		$name: String!
		$password: String!
	) {
		createUser(data: { email: $email, name: $name, password: $password }) {
			id
			email
			name
		}
	}
`;

const SignUp = () => {
	const { inputs, handleChange, resetForm } = useForm<SignUpFormInputProps>({
		email: '',
		name: '',
		password: '',
	});

	const [signup, { loading, data, error }] = useMutation(SIGNUP_MUTATION, {
		variables: inputs,
		// refectch the currently logged in user
		// refetchQueries: [{ query: CURRENT_USER_QUERY }],
	});

	const handleSubmit = async (e: EventProps) => {
		e.preventDefault();
		await signup().catch(console.error);
		resetForm();
	};

	// TODO: Change UX: After SignIn, route directly to Home
	return (
		<StyledForm method="POST" onSubmit={handleSubmit}>
			<h2>Sign Up For an Account</h2>
			<ErrorMessage error={error} />
			<fieldset>
				{data?.createUser && (
					<p>
						Signed up with {data.createUser.email} - Please Go Head and Sign in!
					</p>
				)}
				<label htmlFor="email">
					Your Name
					<input
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
				<button type="submit">Sign In!</button>
			</fieldset>
		</StyledForm>
	);
};

export default SignUp;
