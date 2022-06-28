import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import ProductComponent from '../components/ProductComponent';
import { fakeItem } from '../utils/testUtils';
import mockQueries from '../mocks/queries';
import mockMutations from '../mocks/mutations';

const product = fakeItem();

describe('<ProductComponent/>', () => {
	it('renders out the price tag and title', () => {
		const { container, debug } = render(
			<MockedProvider
				mocks={[mockQueries.currentUser, mockMutations.addToCart, mockMutations.deleteProduct]}
				addTypename={false}
			>
				<ProductComponent product={product} />
			</MockedProvider>,
		);
		const priceTag = screen.getByText('$50');
		expect(priceTag).toBeInTheDocument();
		const link = container.querySelector('a');
		expect(link).toHaveAttribute('href', '/product/abc123');
		expect(link).toHaveTextContent(product.name);
	});

	it('Renders and matches the snapshot', () => {
		const { container, debug } = render(
			<MockedProvider
				mocks={[mockQueries.currentUser, mockMutations.addToCart, mockMutations.deleteProduct]}
				addTypename={false}
			>
				<ProductComponent product={product} />
			</MockedProvider>,
		);
		expect(container).toMatchSnapshot();
	});

	it('renders the image properly', () => {
		const { container, debug } = render(
			<MockedProvider
				mocks={[mockQueries.currentUser, mockMutations.addToCart, mockMutations.deleteProduct]}
				addTypename={false}
			>
				<ProductComponent product={product} />
			</MockedProvider>,
		);
		// grab the image
		const img = screen.getByAltText(product.name);
		expect(img).toBeInTheDocument();
	});
});
