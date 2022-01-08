import useForm from 'hooks/useForm';
import { IEvent, IRequestPasswordResetFormInput } from 'types/commonTypes';
import { gql, useMutation } from '@apollo/client';
import ErrorMessage from 'components/ErrorMessage';
import StyledForm from 'components/styled/StyledForm';

// TODO: Create tests for this component
const REQUEST_PASSWORD_RESET_MUTATION = gql`
	mutation REQUEST_PASSWORD_RESET_MUTATION($email: String!) {
		sendUserPasswordResetLink(email: $email) {
			code
			message
		}
	}
`;

const RequestPasswordReset = () => {
	const { inputs, handleChange, resetForm } =
		useForm<IRequestPasswordResetFormInput>({
			email: '',
		});

	const [resetPassword, { data, error }] = useMutation(
		REQUEST_PASSWORD_RESET_MUTATION,
		{
			variables: inputs,
			// refetchQueries: [{ query: CURRENT_USER_QUERY }],
		},
	);

	const handleSubmit = async (e: IEvent) => {
		e.preventDefault();
		// console.log(inputs);
		// Send the email and password to our GraphQL API
		const res = await resetPassword().catch(console.error);
		// console.log({ res });
		resetForm();
	};

	return (
		<StyledForm method="POST" onSubmit={handleSubmit}>
			<h2>Request a Password Reset</h2>
			<ErrorMessage error={error} />
			<fieldset>
				{data?.sendUserPasswordResetLink === null && (
					<p>Success Check your email for a link!</p>
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
				<button type="submit">Request Reset</button>
			</fieldset>
		</StyledForm>
	);
};

export default RequestPasswordReset;
