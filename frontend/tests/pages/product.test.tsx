import { render, screen } from '@testing-library/react';
import SingleProductPage from '../../pages/product/[id]';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { PRODUCT_QUERY } from '../../gql/queries';
import { resolveMockState } from '../utils';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

useRouter.mockImplementationOnce(() => ({
	query: { page: 1 },
	// asPath: '/posts'
}));

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
		error: new Error('No product found for id: invalid-id'),
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
		it('renders page  in loading state properly', () => {
			render(
				<MockedProvider mocks={mocks} addTypename={false}>
					<SingleProductPage query={{ id: '' }} />
				</MockedProvider>,
			);
			expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
		});

		it('renders page  in loaded state properly', async () => {
			render(
				<MockedProvider mocks={mocks} addTypename={false}>
					<SingleProductPage query={{ id: '' }} />
				</MockedProvider>,
			);
			expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
			await resolveMockState();
			expect(screen.queryByText('Loading...')).toBe(null);
			// TODO: Check if we have the image, check if we have the price,
		});
	});

	describe('when query has invalid id', () => {
		it('renders an error message', async () => {
			render(
				<MockedProvider mocks={mocks} addTypename={false}>
					<SingleProductPage query={{ id: 'invalid-id' }} />
				</MockedProvider>,
			);
			expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
			await resolveMockState();
			expect(
				screen.getByText('No product found for id: invalid-id'),
			).toBeInTheDocument();
		});
	});

	describe('when query contains a valid id', () => {
		it('renders the page properly', async () => {
			render(
				<MockedProvider mocks={mocks} addTypename={false}>
					<SingleProductPage
						query={{ id: '718b7ac6-7cf1-47e7-b1de-c4a13ca92f2d' }}
					/>
				</MockedProvider>,
			);
			expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
			await resolveMockState();
			//TODO: Check what do we have here?..
			// TODO: What is being loaded here?
			expect(screen.getByText('404')).toBeInTheDocument();
		});
	});
});
