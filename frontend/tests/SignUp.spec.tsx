import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { resolveMockState } from './utils';
import { SIGN_UP_MUTATION } from '../gql/mutations';
import { CURRENT_USER_QUERY } from '../gql/queries';
import Signup from '../components/SignUp';

const mocks: MockedResponse[] = [
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
			data: {
				createUser: null,
			},
		},
		error: new Error('Variables were not provided.'),
	},
	{
		request: {
			query: SIGN_UP_MUTATION,
			variables: {
				name: 'Diego Feder',
				email: 'diegovfeder@gmail.com',
				password: '12345678',
			},
		},
		result: {
			data: {
				createUser: {
					id: 'b567b953-2dab-4553-abc8-fdc2a55e3bb2',
					email: 'diegovfeder@gmail.com',
					name: 'Diego Feder',
				},
			},
		},
	},
	{
		request: {
			query: CURRENT_USER_QUERY,
		},
		result: {
			data: {
				authenticatedItem: {
					id: 'b567b953-2dab-4553-abc8-fdc2a55e3bb2',
					email: 'diegovfeder@gmail.com',
					name: 'Diego Feder',
					cart: [],
				},
			},
		},
	},
];

describe('<SignUp/>', () => {
	it('renders component and matches snapshot', () => {
		const { container } = render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<Signup />
			</MockedProvider>,
		);
		expect(container).toMatchSnapshot();
	});

	it('renders without errors', async () => {
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
		expect(screen.queryByTestId('error-message-component')).toBe(null);
		expect(screen.queryByTestId('graphql-error')).toBe(null);
		expect(screen.queryByText('Error:')).toBe(null);
		expect(screen.queryByText('Variables were not provided.')).toBe(null);
	});

	describe('when all inputs are empty', () => {
		describe('when the user clicks on the sign up button', () => {
			it('calls the mutation, gets null as return and renders error', async () => {
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
				expect(screen.queryByTestId('error-message-component')).toBe(null);
				expect(screen.queryByTestId('graphql-error')).toBe(null);
				await userEvent.click(screen.getByText('Sign Up!'));
				await resolveMockState();
				expect(screen.queryByTestId('error-message-component')).toBe(null);
				expect(screen.queryByTestId('graphql-error')).toBe(null);
				expect(screen.getByText('Please fill in all fields.')).toBeVisible();
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
				expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
				expect(screen.getByText('Name')).toBeVisible();
				expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
				expect(screen.getByText('Email')).toBeVisible();
				expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
				expect(screen.getByText('Password')).toBeVisible();
				expect(screen.getByRole('button')).toBeVisible();
				expect(screen.getByText('Sign Up!')).toBeVisible();
				await userEvent.type(screen.getByPlaceholderText(/name/i), 'Diego Feder');
				await userEvent.type(screen.getByPlaceholderText(/email/i), 'diegovfeder@gmail.com');
				await userEvent.type(screen.getByPlaceholderText(/password/i), '12345678');
				await userEvent.click(screen.getByText('Sign Up!'));
				await resolveMockState();
				expect(screen.queryByText('Please fill in all fields.')).toBe(null);
				await screen.findByText(
					`Signed Up with diegovfeder@gmail.com - Please Go Ahead and Sign In!`,
				);
			});
		});
	});
});
