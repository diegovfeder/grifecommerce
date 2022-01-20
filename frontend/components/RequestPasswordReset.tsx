import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import StyledForm from './styles/StyledForm';
import useForm from '../hooks/useForm';
import Error from './ErrorMessage';
import {
	EventProps,
	RequestPasswordResetFormInputProps,
} from '../types/commonTypes';

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
		useForm<RequestPasswordResetFormInputProps>({
			email: '',
		});

	const [signup, { data, loading, error }] = useMutation(
		REQUEST_PASSWORD_RESET_MUTATION,
		{
			variables: inputs,
			// refetchQueries: [{ query: CURRENT_USER_QUERY }],
		},
	);

	const handleSubmit = async (e: EventProps) => {
		e.preventDefault(); // stop the form from submitting
		await signup().catch(console.error);
		resetForm();
	};

	return (
		<StyledForm method="POST" onSubmit={handleSubmit}>
			<h2>Request a Password Reset</h2>
			<Error error={error} />
			<fieldset>
				{data?.sendUserPasswordResetLink === null && (
					<p>Success! Check your email for a link!</p>
				)}

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
				<button type="submit">Request Reset!</button>
			</fieldset>
		</StyledForm>
	);
};

export default RequestPasswordReset;
