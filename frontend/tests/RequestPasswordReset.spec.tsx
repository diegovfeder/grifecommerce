import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

import { resolveMockState } from './utils';
import { USER_EMAIL_QUERY } from '../gql/queries';
import { SEND_USER_PASSWORD_RESET_LINK_MUTATION } from '../gql/mutations';
import RequestPasswordReset from '../components/RequestPasswordReset';

const email = 'diego@test.com';
const mocks = [
	{
		request: {
			query: USER_EMAIL_QUERY,
			variables: { email },
		},
		result: {
			data: {
				user: {
					id: '1',
					email,
				},
			},
		},
	},
	{
		request: {
			query: SEND_USER_PASSWORD_RESET_LINK_MUTATION,
			variables: { email },
		},
		result: {
			data: {
				sendUserPasswordResetLink: true,
			},
		},
	},
];

describe('<RequestPasswordReset/>', () => {
	it('renders component and matches snapshot', () => {
		const { container } = render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<RequestPasswordReset />
			</MockedProvider>,
		);
		expect(container).toMatchSnapshot();
	});

	it('calls the mutation when submitted', async () => {
		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<RequestPasswordReset />
			</MockedProvider>,
		);
		userEvent.type(screen.getByPlaceholderText(/email/i), email);
		userEvent.click(screen.getByText(/Request Reset/));
		await resolveMockState();
		const success = await screen.findByText(/Password reset/i);
		expect(success).toBeInTheDocument();
	});
});
