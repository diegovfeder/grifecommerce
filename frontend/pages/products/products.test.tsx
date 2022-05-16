/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { PAGINATION_QUERY } from '../../components/Pagination';
import { PRODUCTS_QUERY } from '../../components/ProductsGridComponent';
import ProductsPage from '.';

const mocks = [
	{
		request: {
			query: PAGINATION_QUERY,
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

describe('Products Page', () => {
	describe('When user is not Signed In', () => {
		it('should render the Sign In page', () => {
			render(
				<MockedProvider mocks={mocks} addTypename={false}>
					<ProductsPage />
				</MockedProvider>,
			);

			expect(screen.getByText('Sign Into Your Account')).toBeVisible();
			expect(screen.getByText('Email')).toBeVisible();
			expect(screen.getByText('Password')).toBeVisible();
			expect(screen.getByText('Sign In!')).toBeVisible();
		});
	});

	describe.skip('When user is Signed In', () => {
		// describe('and has no items in cart', () => {})
		// describe('and user has admin role', () => {})

		it('should render the Products Page properly', () => {
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
