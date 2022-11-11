import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { fakeItem } from '../utils/testUtils';
import mockedMutations from '../mocks/mutations';
import mockedQueries from '../mocks/queries';
import ProductComponent from '../components/ProductComponent';

const product = fakeItem();

describe('<ProductComponent/>', () => {
	it('renders component and matches the snapshot', () => {
		const { container, debug } = render(
			<MockedProvider
				mocks={[
					mockedQueries.currentUser,
					mockedMutations.addToCart,
					mockedMutations.deleteProduct,
				]}
				addTypename={false}
			>
				<ProductComponent product={product} />
			</MockedProvider>,
		);
		expect(container).toMatchSnapshot();
	});

	it('renders the price tag and title', () => {
		const { container } = render(
			<MockedProvider
				mocks={[
					mockedQueries.currentUser,
					mockedMutations.addToCart,
					mockedMutations.deleteProduct,
				]}
				addTypename={false}
			>
				<ProductComponent product={product} />
			</MockedProvider>,
		);
		const priceTag = screen.getByText('R$ 50,00');
		expect(priceTag).toBeInTheDocument();
		const link = container.querySelector('a');
		expect(link).toHaveAttribute(
			'href',
			'/product/718b7ac6-7cf1-47e7-b1de-c4a13ca92f2d',
		);
		expect(link).toHaveTextContent(product.name);
	});

	it('renders the product properly', () => {
		render(
			<MockedProvider
				mocks={[
					mockedQueries.currentUser,
					mockedMutations.addToCart,
					mockedMutations.deleteProduct,
				]}
				addTypename={false}
			>
				<ProductComponent product={product} />
			</MockedProvider>,
		);
		expect(screen.getByText(product.name)).toBeInTheDocument();
	});
});
