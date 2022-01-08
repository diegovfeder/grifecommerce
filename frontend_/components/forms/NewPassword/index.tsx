import useForm from 'hooks/useForm';
import StyledForm from '../../styled/StyledForm';
import { IEvent, IRedeemPasswordResetFormInput } from 'types/commonTypes';
import { gql, useMutation } from '@apollo/client';
import ErrorMessage from 'components/ErrorMessage';

const RESET_MUTATION = gql`
	mutation RESET_MUTATION(
		$email: String!
		$password: String!
		$token: String!
	) {
		redeemUserPasswordResetToken(
			email: $email
			password: $password
			token: $token
		) {
			code
			message
		}
	}
`;

const Reset = ({ token }: any) => {
	const { inputs, handleChange, resetForm } =
		useForm<IRedeemPasswordResetFormInput>({
			email: '',
			password: '',
			token,
		});

	const [reset, { data, error }] = useMutation(RESET_MUTATION, {
		variables: inputs,
	});

	const tokenError = data?.redeemUserPasswordResetToken?.code
		? data?.redeemUserPasswordResetToken
		: undefined;

	const handleSubmit = async (e: IEvent) => {
		e.preventDefault();
		// Send the email and password to our GraphQL API
		const res = await reset().catch(console.error);
		resetForm();
	};

	return (
		<StyledForm method="POST" onSubmit={handleSubmit}>
			<h2>Update your Password</h2>
			<ErrorMessage error={error || tokenError} />
			<fieldset>
				{data?.redeemUserPasswordResetToken === null && (
					<p>Success! You`re now able to Sign In!</p>
				)}
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
				<button type="submit">Set New Password!</button>
			</fieldset>
		</StyledForm>
	);
};

export default Reset;
