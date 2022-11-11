import { render, screen } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

import { CURRENT_USER_QUERY } from '../../hooks/useUserQuery';
import SellPage from '../../pages/sell';

const mocks: MockedResponse[] = [
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

describe('<SellPage/>', () => {
	test('use jsdom in this test file', () => {
		const element = document.createElement('div');
		expect(element).not.toBeNull();
	});

	// TODO: Define roles/permissions and then test this back
	describe('when user is not signed in', () => {
		it('renders the sign in page', () => {
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

	describe.skip('when user is signed in', () => {
		it('renders the sell page', () => {
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
