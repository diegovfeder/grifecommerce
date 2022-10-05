import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { makePaginationMocksFor } from '../utils/testUtils';
import PaginationComponent from '../components/PaginationComponent';

describe('<PaginationComponent/>', () => {
	it('renders pagination, single page and one product', () => {
		const { container } = render(
			<MockedProvider mocks={makePaginationMocksFor(1)}>
				<PaginationComponent page={1} productsCount={1} />
			</MockedProvider>,
		);
		expect(container).toHaveTextContent(
			'← PrevPage 1 of 1Total Products: 1Next →',
		);
	});

	it('renders pagination, multiple products', async () => {
		const { container, debug } = render(
			<MockedProvider mocks={makePaginationMocksFor(36)}>
				<PaginationComponent page={1} productsCount={36} />
			</MockedProvider>,
		);
		await screen.findByTestId('pagination');
		expect(container).toHaveTextContent('Page 1 of 9');
		const pageCountSpan = screen.getByTestId('pageCount');
		expect(pageCountSpan).toHaveTextContent('9');
		expect(container).toMatchSnapshot();
	});

	it('disables the previous and next button when in single page', async () => {
		render(
			<MockedProvider mocks={makePaginationMocksFor(2)}>
				<PaginationComponent page={1} productsCount={2} />
			</MockedProvider>,
		);
		await screen.findByTestId('pagination');
		const prevButton = screen.getByText(/Prev/);
		const nextButton = screen.getByText(/Next/);
		expect(prevButton).toHaveAttribute('aria-disabled', 'true');
		expect(nextButton).toHaveAttribute('aria-disabled', 'true');
	});

	it('disables the next button when in the last page', async () => {
		render(
			<MockedProvider mocks={makePaginationMocksFor(11)}>
				<PaginationComponent page={3} productsCount={11} />
			</MockedProvider>,
		);
		await screen.findByTestId('pagination');
		const prevButton = screen.getByText(/Prev/);
		const nextButton = screen.getByText(/Next/);
		expect(prevButton).toHaveAttribute('aria-disabled', 'false');
		expect(nextButton).toHaveAttribute('aria-disabled', 'true');
	});

	it('enables previous and next buttons when in a middle page', async () => {
		render(
			<MockedProvider mocks={makePaginationMocksFor(24)}>
				<PaginationComponent page={4} productsCount={24} />
			</MockedProvider>,
		);
		await screen.findByTestId('pagination');
		const prevButton = screen.getByText(/Prev/);
		const nextButton = screen.getByText(/Next/);
		expect(prevButton).toHaveAttribute('aria-disabled', 'false');
		expect(nextButton).toHaveAttribute('aria-disabled', 'false');
	});
});
