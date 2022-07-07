import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import Router from 'next/router'; // We will MOCK THIS
import wait from 'waait';
import CreateProduct, {
	CREATE_PRODUCT_MUTATION,
} from '../components/CreateProduct';
<<<<<<< HEAD:frontend/tests/CreateProduct.test.js
import { fakeItem, makePaginationMocksFor } from '../utils/testUtils';
import { PRODUCTS_QUERY } from '../components/Products';
=======
import {
	fakeItem,
	// makePaginationMocksFor
} from '../utils/testUtils';
import PRODUCTS_QUERY from '../gql/queryProducts.gql';
>>>>>>> dev:frontend/tests/CreateProduct.spec.tsx

import { logRoles } from '@testing-library/dom';

// TODO: Enforce typing for this fakeItem();
const item = fakeItem();

jest.mock('next/router', () => ({
	push: jest.fn(),
}));

const mocks = [
	{
		request: {
			query: PRODUCTS_QUERY,
			variables: {
				take: 1,
				skip: 0,
			},
		},
		result: {
			data: {
				products: [item],
				productsCount: 1,
			},
		},
	},
	{
		request: {
			query: PRODUCTS_QUERY,
			variables: {
				take: 4,
				skip: 0,
			},
		},
		result: {
			data: {
				products: [item, item, item, item],
				productsCount: 4,
			},
		},
	},
];

describe('<CreateProduct/>', () => {
	it('renders and matches snapshot', () => {
		const {
			container,
			// debug
		} = render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<CreateProduct />
			</MockedProvider>,
		);
		expect(container).toMatchSnapshot();
	});

	it('handles the updating', async () => {
		const { container } = render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<CreateProduct />
			</MockedProvider>,
		);
		logRoles(container);

		// 2. type into the boxes
		await userEvent.type(screen.getByPlaceholderText(/Name/i), item.name);
		await userEvent.type(
			screen.getByPlaceholderText(/Price/i),
			item.price.toString(),
		);
		await userEvent.type(
			screen.getByPlaceholderText(/Description/i),
			item.description,
		);

		// 3.  check that those boxes are populated!
		expect(screen.getByDisplayValue(item.name)).toBeInTheDocument();
		expect(screen.getByDisplayValue(item.price)).toBeInTheDocument();
		expect(screen.getByDisplayValue(item.description)).toBeInTheDocument();
	});

	it('creates the items when the form is submitted', async () => {
		const mocks = [
			{
				request: {
					query: CREATE_PRODUCT_MUTATION,
					variables: {
						name: item.name,
						description: item.description,
						image: '',
						price: item.price,
					},
				},
				result: {
					data: {
						createProduct: {
							...item, // TODO: Pass down all fake item fields
							id: 'abc123',
						},
					},
				},
			},
			{
				request: {
					query: PRODUCTS_QUERY,
					variables: { take: 2, skip: 0 },
				},
				result: {
					data: {
						allProducts: [item],
					},
				},
			},
		];

		const { container } = render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<CreateProduct />
			</MockedProvider>,
		);
		logRoles(container);

		// Type into the inputs
		// 2. type into the boxes
		await userEvent.type(screen.getByPlaceholderText(/Name/i), item.name);
		await userEvent.type(
			screen.getByPlaceholderText(/Price/i),
			item.price.toString(),
		);
		await userEvent.type(
			screen.getByPlaceholderText(/Description/i),
			item.description,
		);

		// Submit it and see if the page change has been called
		await userEvent.click(screen.getByText(/Add Product/));
		await waitFor(() => wait(0));
		expect(Router.push).toHaveBeenCalled();

		// FIXME: Check this
		expect(Router.push).toHaveBeenCalledWith({ pathname: '/product/abc123' });
	});
});
