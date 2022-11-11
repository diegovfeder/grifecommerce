import { render, screen } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

import { resolveMockState } from '../utils';
import { PRODUCTS_QUERY, PRODUCTS_COUNT_QUERY } from '../../gql/queries';
import ProductsPage from '../../pages/products';

const mocks = [
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
			query: PRODUCTS_QUERY,
		},
		result: {
			data: {
				products: [
					{
						id: '718b7ac6-7cf1-47e7-b1de-c4a13ca92f2d',
						name: 'Sample Pack',
						price: 2000,
						description: '',
						photo: {
							altText: 'sample_pack',
							id: '0088b6c6-a3f1-4f4b-b929-3592b353d825',
							image: {
								publicUrlTransformed:
									'https://res.cloudinary.com/grifemusic/image/upload…57878/grifecommerce/cl36aaj690000gt9kejqreuiq.png',
							},
						},
					},
				],
			},
		},
	},
] as MockedResponse[];

describe('<ProductsPage>', () => {
	describe('when user is not signed in', () => {
		it('renders the products page', async () => {
			render(
				<MockedProvider mocks={mocks} addTypename={false}>
					<ProductsPage />
				</MockedProvider>,
			);

			expect(screen.getByLabelText(/Loading/)).toBeInTheDocument();
			await resolveMockState();
			expect(screen.getAllByText(/Prev/)[0]).toBeVisible();
			expect(screen.getAllByText(/Prev/)[1]).toBeVisible();
			expect(screen.getAllByText(/Page/)[0]).toBeVisible();
			expect(screen.getAllByText(/Page/)[1]).toBeVisible();
			expect(screen.getAllByText(/Total Products/)[0]).toBeVisible();
			expect(screen.getAllByText(/Total Products/)[1]).toBeVisible();
		});
	});

	describe.skip('when the user is signed in', () => {
		// describe('and has no items in cart', () => {})
		// describe('and user has admin role', () => {})

		it('renders the products page properly', () => {
			render(
				<MockedProvider mocks={mocks} addTypename={false}>
					<ProductsPage />
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
