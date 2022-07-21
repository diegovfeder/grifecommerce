import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MockedResponse } from '@apollo/client/testing';
import { CURRENT_USER_QUERY } from '../../../../hooks/useUserQuery';
import SellPage from '../../../../pages/sell';

const mocks = [
	{
		request: {
			query: CURRENT_USER_QUERY,
		},
		result: {
			data: {
				authenticatedItem: {},
				cart: [],
				email: 'diegovfeder@gmail.com',
				id: 'b567b953-2dab-4553-abc8-fdc2a55e3bb2',
				name: 'Diego Feder',
			},
		},
	},
] as MockedResponse[];

describe('Sell Page', () => {
	describe('When user is not Signed In', () => {
		it('should render the Sign In page', () => {
			render(
				<MockedProvider mocks={mocks} addTypename={false}>
					<SellPage />
				</MockedProvider>,
			);

			expect(screen.getByText('Sign Into Your Account')).toBeVisible();
			expect(screen.getByText('Email')).toBeVisible();
			expect(screen.getByText('Password')).toBeVisible();
			expect(screen.getByText('Sign In!')).toBeVisible();
		});
	});

	describe.skip('When user is Signed In', () => {
		it('should render the Sell Page', () => {
			render(
				<MockedProvider mocks={mocks} addTypename={false}>
					<SellPage />
				</MockedProvider>,
			);
			// TODO: Resolve SignIn
			// expect(screen.getByText('Name')).toBeInTheDocument();
			// expect(screen.getByText('Description')).toBeInTheDocument();
			// expect(screen.getByText('Price')).toBeInTheDocument();
			// expect(screen.getByText('+ Add Product')).toBeInTheDocument();
		});
	});
});
