import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';
import { resolveMockState } from './utils';
import { PRODUCT_QUERY } from '../gql/queries';
import SingleProduct from '../components/SingleProduct';

const mocks = [
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
						id: '0088b6c6-a3f1-4f4b-b929-3592b353d825',
						altText: 'sample_pack',
						image: {
							publicUrlTransformed:
								'https://res.cloudinary.com/grifemusic/image/upload/v1652557878/grifecommerce/cl36aaj690000gt9kejqreuiq.png',
						},
					},
				},
			},
		},
	},
];

describe('<Single Product/>', () => {
	it('renders with proper data', async () => {
		const { container } = render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<SingleProduct id="718b7ac6-7cf1-47e7-b1de-c4a13ca92f2d" />
			</MockedProvider>,
		);
		await screen.findAllByLabelText('Loading...');
		await screen.findByTestId('loading-label');
		await resolveMockState();
		await screen.findByTestId('single-product-component');
		expect(container).toMatchSnapshot();
	});

	it('Errors out when an item is no found', async () => {
		const errorMock = [
			{
				request: {
					query: PRODUCT_QUERY,
					variables: {
						id: '123',
					},
				},
				result: {
					errors: [new GraphQLError('Product not found')],
				},
			},
		];
		const { container } = render(
			<MockedProvider mocks={errorMock} addTypename={false}>
				<SingleProduct id="123" />
			</MockedProvider>,
		);
		await screen.findByTestId('graphql-error');
		expect(container).toHaveTextContent('Error:');
		expect(container).toHaveTextContent('Product not found');
	});
});
