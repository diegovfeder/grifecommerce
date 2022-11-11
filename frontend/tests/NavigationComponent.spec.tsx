import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import NavigationComponent from '../components/NavigationComponent';
import { CURRENT_USER_QUERY } from '../hooks/useUserQuery';
import { fakeUser, fakeCartItem } from '../utils/testUtils';
import CartStateProvider from '../providers/CartStateProvider';

const notSignedInMocks = [
	{
		request: { query: CURRENT_USER_QUERY },
		result: { data: { authenticatedItem: null } },
	},
];

const signedInMocks = [
	{
		request: { query: CURRENT_USER_QUERY },
		result: { data: { authenticatedItem: fakeUser() } },
	},
];

const signedInMocksWithCartItems = [
	{
		request: { query: CURRENT_USER_QUERY },
		result: {
			data: {
				authenticatedItem: fakeUser({
					cart: [fakeCartItem()],
				}),
			},
		},
	},
];

describe('<NavigationComponent/>', () => {
	it('renders navigation when signed out', () => {
		const { container, debug } = render(
			<CartStateProvider>
				<MockedProvider mocks={notSignedInMocks}>
					<NavigationComponent />
				</MockedProvider>
			</CartStateProvider>,
		);
		expect(container).toHaveTextContent(/sign in/i);
		expect(container).toMatchSnapshot();
		const link = screen.getByText(/sign in/i);
		expect(link).toHaveAttribute('href', '/signin');
		const productsLink = screen.getByText(/products/i);
		expect(productsLink).toBeInTheDocument();
		expect(productsLink).toHaveAttribute('href', '/products/1');
	});

	it('renders navigation when signed in', async () => {
		const { container, debug } = render(
			<CartStateProvider>
				<MockedProvider mocks={signedInMocks}>
					<NavigationComponent />
				</MockedProvider>
			</CartStateProvider>,
		);
		await screen.findByText(/account/i);
		expect(container).toMatchSnapshot();
		expect(container).toHaveTextContent(/sign out/i);
		expect(container).toHaveTextContent(/my cart/i);
	});

	it('renders the amount of items in the cart', async () => {
		const { container, debug } = render(
			<CartStateProvider>
				<MockedProvider mocks={signedInMocksWithCartItems}>
					<NavigationComponent />
				</MockedProvider>
			</CartStateProvider>,
		);
		await screen.findByText(/account/i);
		expect(screen.getByText('3')).toBeInTheDocument();
	});
});
