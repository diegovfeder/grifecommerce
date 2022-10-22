import { useMutation } from '@apollo/client';
import Error from './error/ErrorMessage';
import StyledForm from './styles/StyledForm';
import useForm from '../hooks/useForm';
import {
	EventProps,
	RedeemPasswordResetFormInputProps,
} from '../types/commonTypes';
import { RESET_PASSWORD_MUTATION } from '../gql/mutations';

const ResetPasswordComponent = ({ token }: any) => {
	const { inputs, handleChange, resetForm } =
		useForm<RedeemPasswordResetFormInputProps>({
			email: '',
			password: '',
			token,
		});

	const [reset, { data, error }] = useMutation(RESET_PASSWORD_MUTATION, {
		variables: inputs,
	});

	const successfulError = data?.redeemUserPasswordResetToken?.code
		? data?.redeemUserPasswordResetToken
		: undefined;

	const handleSubmit = async (e: EventProps) => {
		e.preventDefault();
		await reset().catch(console.error);
		resetForm();
	};

	return (
		<StyledForm method="POST" onSubmit={handleSubmit}>
			<h2>Reset Your Password</h2>
			<Error error={error || successfulError} />
			<fieldset>
				{data?.redeemUserPasswordResetToken === null && (
					<p>Success! You can Now sign in</p>
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
				<button type="submit">Request Reset!</button>
			</fieldset>
		</StyledForm>
	);
};

export default ResetPasswordComponent;
