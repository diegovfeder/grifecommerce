import { render, screen } from '@testing-library/react';
import { ApolloError } from '@apollo/client';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

import { PRODUCT_QUERY } from '../../gql/queries';
import ProductDetailsPage from '../../pages/product/[id]';
import { resolveMockState } from '../utils';

const mocks = [
	{
		request: {
			query: PRODUCT_QUERY,
			variables: {
				id: '',
			},
		},
		result: {
			data: {
				product: {},
			},
		},
	},
	{
		request: {
			query: PRODUCT_QUERY,
			variables: {
				id: 'invalid-id',
			},
		},
		error: new ApolloError({
			errorMessage: 'No product found for id: invalid-id',
		}),
	},
	{
		request: {
			query: PRODUCT_QUERY,
			variables: {
				id: '718b7ac6-7cf1-47e7-b1de-c4a13ca92f2d',
			},
		},
		result: {
			data: {
				product: {
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
			},
		},
	},
] as MockedResponse[];

describe('product/[id] page', () => {
	describe('when query contains empty id', () => {
		it('renders page with error', async () => {
			render(
				<MockedProvider mocks={mocks} addTypename={false}>
					<ProductDetailsPage query={{ id: '' }} />
				</MockedProvider>,
			);
			expect(screen.queryByText('Loading...')).toBe(null);
			expect(screen.getByTestId('error-message-component')).toBeVisible();
			expect(screen.getByTestId('graphql-error')).toBeVisible();
			expect(screen.getByText('Error:')).toBeVisible();
			expect(screen.getByText('Product not found.')).toBeVisible();
			expect(screen.queryByTestId('single-product-component')).toBe(null);
			expect(
				screen.queryByTestId('single-product-component-null'),
			).toBeVisible();
		});
	});

	describe('when query contains an invalid id', () => {
		it('renders page with error', async () => {
			render(
				<MockedProvider mocks={mocks} addTypename={false}>
					<ProductDetailsPage query={{ id: 'invalid-id' }} />
				</MockedProvider>,
			);
			expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
			await resolveMockState();
			expect(screen.queryByText('Loading...')).toBe(null);
			expect(screen.getByTestId('error-message-component')).toBeVisible();
			expect(screen.getByTestId('graphql-error')).toBeVisible();
			expect(screen.getByText('Error:')).toBeVisible();
			expect(
				screen.getByText('No product found for id: invalid-id'),
			).toBeVisible();
		});
	});

	describe('when query contains a valid id', () => {
		it('renders the single product page properly', async () => {
			render(
				<MockedProvider mocks={mocks} addTypename={false}>
					<ProductDetailsPage
						query={{ id: '718b7ac6-7cf1-47e7-b1de-c4a13ca92f2d' }}
					/>
				</MockedProvider>,
			);
			expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
			await resolveMockState();
			expect(screen.queryByTestId('single-product-component')).toBeVisible();
			expect(screen.queryByTestId('single-product-component-null')).toBe(null);
			expect(screen.getByText('Sample Pack')).toBeVisible();
			expect(screen.getByText('R$ 20,00')).toBeVisible();
			expect(screen.getByText('next/image stub')).toBeVisible();
			expect(screen.getByText(/No description available/i)).toBeVisible();
		});
	});
});
