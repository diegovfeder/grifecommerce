import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import Signup from '../components/SignUp';
import { SIGN_UP_MUTATION } from '../gql/mutations';
import { resolveMockState } from './utils';
import { GraphQLError } from 'graphql';
// import { CURRENT_USER_QUERY } from '../hooks/useUserQuery';
// import { fakeUser } from '../utils/testUtils';
// import wait from 'waait';

const mocks = [
	{
		request: {
			query: SIGN_UP_MUTATION,
			variables: {
				name: '',
				email: '',
				password: '',
			},
		},
		result: {
			// error: new Error('Email is required'),
			errors: [new GraphQLError('Email is required')],
		},
	},
	{
		request: {
			query: SIGN_UP_MUTATION,
			variables: {
				name: 'Diego Feder',
				email: 'diego@test.com',
				password: '12345678',
			},
		},
		result: {
			data: {
				createUser: {
					id: 'a098824c-a2d3-43ab-94b8-103fb10ce88c',
					name: 'Diego Feder',
					email: 'diego@test.com',
				},
			},
		},
	},
];

describe('<SignUp/>', () => {
	it('render and matches snapshot', () => {
		const { container } = render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<Signup />
			</MockedProvider>,
		);
		expect(container).toMatchSnapshot();
	});

	describe('when all inputs are empty', () => {
		describe('when the user clicks on the sign up button', () => {
			it('calls the mutation, gets null as return', async () => {
				render(
					<MockedProvider mocks={mocks} addTypename={false}>
						<Signup />
					</MockedProvider>,
				);
				expect(screen.getByText('Sign Up For an Account')).toBeVisible();
				expect(screen.getByText('Name')).toBeVisible();
				expect(screen.getByText('Email')).toBeVisible();
				expect(screen.getByText('Password')).toBeVisible();
				expect(screen.getByText('Sign Up!')).toBeVisible();
				await userEvent.click(screen.getByText('Sign Up!'));
				await resolveMockState();
				// expect(screen.getByText('Email is required')).toBeVisible();
			});
		});
	});

	describe('when all inputs are filled', () => {
		describe('when the user clicks on the sign up button', () => {
			it('calls the mutation properly', async () => {
				render(
					<MockedProvider mocks={mocks} addTypename={false}>
						<Signup />
					</MockedProvider>,
				);
				expect(screen.getByText('Sign Up For an Account')).toBeVisible();
				expect(screen.getByText('Name')).toBeVisible();
				expect(screen.getByText('Email')).toBeVisible();
				expect(screen.getByText('Password')).toBeVisible();
				expect(screen.getByText('Sign Up!')).toBeVisible();
				// TODO: Get all the inputs and fill them in
				expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
				// await userEvent.type(screen.getByPlaceholderText(/name/i), me.name);
				// await userEvent.type(screen.getByPlaceholderText(/email/i), me.email);
				// await userEvent.type(screen.getByPlaceholderText(/password/i), password);
				await userEvent.click(screen.getByText('Sign Up!'));
				await resolveMockState();
				// await screen.findByText(
				// 	`Signed up with ${me.email} - Please Go Head and Sign in!`,
				// );
			});
		});
	});
});
