import useForm from 'hooks/useForm';
import StyledForm from '../styled/StyledForm';

import { IEvent } from 'types/commonTypes';
// import { CURRENT_USER_QUERY } from 'components/UserComponent';
import { gql, useMutation } from '@apollo/client';
import ErrorMessage from 'components/ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
	mutation REQUEST_RESET_MUTATION($email: String!) {
		sendUserPasswordResetLink(email: $email) {
			id
			name
			email
		}
	}
`;

// TODO: Create GENERIC type useForm
const RequestReset = () => {
	const { inputs, handleChange, resetForm } = useForm({
		name: '',
		email: '',
		password: '',
	});

	const [resetPassword, { data, loading, error }] = useMutation(
		REQUEST_RESET_MUTATION,
		{
			variables: inputs,
			// refetchQueries: [{ query: CURRENT_USER_QUERY }],
		},
	);

	const handleSubmit = async (e: IEvent) => {
		e.preventDefault();
		console.log(inputs);
		// Send the email and password to our GraphQL API
		const res = await resetPassword().catch(console.error);
		console.log(res);
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

export default RequestReset;
