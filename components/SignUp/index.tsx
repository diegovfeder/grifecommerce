import useForm from 'hooks/useForm';
import StyledForm from '../styled/StyledForm';
import { IEvent } from 'types/commonTypes';
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

// FIXME:
// - pass genertics into useForm and so dinamically type that component on declaration.
const SignUp = () => {
	const { inputs, handleChange, resetForm } = useForm({
		name: '',
		email: '',
		password: '',
	});

	const [signup, { data, loading, error }] = useMutation(SIGN_UP_MUTATION, {
		variables: inputs,
	});

	const handleSubmit = async (e: IEvent) => {
		e.preventDefault();
		console.log(inputs);
		// Send the email and password to our GraphQL API
		const res = await signup().catch(console.error);
		console.log(res);
		resetForm();
	};

	return (
		<StyledForm method="POST" onSubmit={handleSubmit}>
			<h2>Sign Up for an Account</h2>
			<ErrorMessage error={error} />
			<fieldset>
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
				<button type="submit">Sign In!</button>
			</fieldset>
		</StyledForm>
	);
};

export default SignUp;
