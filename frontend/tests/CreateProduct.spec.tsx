import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import wait from 'waait';
import { fakeItem } from '../utils/testUtils';
import { PRODUCTS_QUERY, PRODUCTS_COUNT_QUERY } from '../gql/queries';
import { CREATE_PRODUCT_MUTATION } from '../gql/mutations';
import CreateProduct from '../components/CreateProduct';

// TODO: Test creation of product

jest.mock('next/router', () => ({
	push: jest.fn(),
}));

const item = fakeItem();

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
				allProducts: [item, item],
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
			},
		},
	},
	{
		request: {
			query: PRODUCTS_COUNT_QUERY,
		},
		result: {
			data: {
				productsCount: 1,
			},
		},
	},
	{
		request: {
			query: PRODUCTS_COUNT_QUERY,
		},
		result: {
			data: {
				productsCount: 2,
			},
		},
	},
	{
		request: {
			query: PRODUCTS_COUNT_QUERY,
		},
		result: {
			data: {
				productsCount: 4,
			},
		},
	},
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
					...item,
					id: 'abc123',
				},
			},
		},
	},
];

describe('<CreateProduct/>', () => {
	it('renders component and matches snapshot', () => {
		const { container } = render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<CreateProduct />
			</MockedProvider>,
		);
		expect(container).toMatchSnapshot();
	});

	it('handles updating the product', async () => {
		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<CreateProduct />
			</MockedProvider>,
		);

		await userEvent.type(screen.getByPlaceholderText(/Name/i), item.name);
		await userEvent.type(
			screen.getByPlaceholderText(/Price/i),
			item.price.toString(),
		);
		await userEvent.type(
			screen.getByPlaceholderText(/Description/i),
			item.description,
		);

		expect(screen.getByDisplayValue(item.name)).toBeInTheDocument();
		expect(screen.getByDisplayValue(item.price)).toBeInTheDocument();
		expect(screen.getByDisplayValue(item.description)).toBeInTheDocument();
	});

	it('creates the product when the form is submitted', async () => {
		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<CreateProduct />
			</MockedProvider>,
		);

		await userEvent.type(screen.getByPlaceholderText(/name/i), item.name);
		await userEvent.type(
			screen.getByPlaceholderText(/price/i),
			item.price.toString(),
		);
		await userEvent.type(
			screen.getByPlaceholderText(/description/i),
			item.description,
		);
		await userEvent.click(screen.getByText(/add product/i));

		// FIXME: Test
		await waitFor(() => wait(0));

		expect(Router.push).toHaveBeenCalled();
		// expect(jest.fn()).toHaveBeenCalled()
		// Expected number of calls: >= 1
		// Received number of calls:    0
		expect(Router.push).toHaveBeenCalledWith({ pathname: '/product/abc123' });
	});
});
