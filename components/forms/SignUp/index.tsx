import useForm from 'hooks/useForm';
import StyledForm from '../../styled/StyledForm';
import { IEvent, ISignUpFormInput } from 'types/commonTypes';
import { gql, useMutation } from '@apollo/client';
import ErrorMessage from 'components/ErrorMessage';

const SIGN_UP_MUTATION = gql`
	mutation SIGN_UP_MUTATION(
		$name: String!
		$email: String!
		$password: String!
	) {
		createUser(data: { name: $name, email: $email, password: $password }) {
			id
			name
			email
		}
	}
`;

const SignUp = () => {
	const { inputs, handleChange, resetForm } = useForm<ISignUpFormInput>({
		name: '',
		email: '',
		password: '',
	});

	const [signup, { data, error }] = useMutation(SIGN_UP_MUTATION, {
		variables: inputs,
	});

	const handleSubmit = async (e: IEvent) => {
		e.preventDefault();
		// Send the email and password to our GraphQL API
		const res = await signup().catch(console.error);
		resetForm();
	};

	return (
		<StyledForm method="POST" onSubmit={handleSubmit}>
			<h2>Create an Account!</h2>
			<ErrorMessage error={error} />
			<fieldset>
				{/* TODO: Change UX: After SignIn, route directly to Home */}
				{data?.createUser && (
					<p>
						Signed up with {data.createUser.email} - Please go ahead and Sign
						in!
					</p>
				)}
				<label htmlFor="name">Name</label>
				<input
					type="text"
					name="name"
					placeholder="Your Name"
					autoComplete="name"
					value={inputs.name}
					onChange={handleChange}
				/>
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
				<button type="submit">Sign Up!</button>
			</fieldset>
		</StyledForm>
	);
};

export default SignUp;
