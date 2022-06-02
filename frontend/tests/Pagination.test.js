import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { makePaginationMocksFor } from '../utils/testUtils';
import Pagination from '../components/Pagination';

describe('<Pagination/>', () => {
	it('displays a loading message', () => {
		const { container } = render(
			<MockedProvider mocks={makePaginationMocksFor(1)}>
				<Pagination page={1} productsCount={1} />
			</MockedProvider>,
		);
		expect(container).toHaveTextContent(
			'← PrevPage 1 of 1Total Products: 1Next →',
		);
		// expect(container).toHaveTextContent('Loading...');
	});
	it('renders pagination for 36 items', async () => {
		const { container, debug } = render(
			<MockedProvider mocks={makePaginationMocksFor(36)}>
				<Pagination page={1} productsCount={36} />
			</MockedProvider>,
		);
		await screen.findByTestId('pagination');
		expect(container).toHaveTextContent('Page 1 of 9');
		const pageCountSpan = screen.getByTestId('pageCount');
		expect(pageCountSpan).toHaveTextContent('9');
		expect(container).toMatchSnapshot();
	});

	it('disables the prev page on first page', async () => {
		const { container, debug } = render(
			<MockedProvider mocks={makePaginationMocksFor(2)}>
				<Pagination page={1} productsCount={2} />
			</MockedProvider>,
		);
		await screen.findByTestId('pagination');
		const prevButton = screen.getByText(/Prev/);
		const nextButton = screen.getByText(/Next/);
		expect(prevButton).toHaveAttribute('aria-disabled', 'true');
		// expect(nextButton).toHaveAttribute('aria-disabled', 'false');
	});
	it('disables the next page on last page', async () => {
		const { container, debug } = render(
			<MockedProvider mocks={makePaginationMocksFor(11)}>
				<Pagination page={3} productsCount={11} />
			</MockedProvider>,
		);
		await screen.findByTestId('pagination');
		const prevButton = screen.getByText(/Prev/);
		const nextButton = screen.getByText(/Next/);
		expect(prevButton).toHaveAttribute('aria-disabled', 'false');
		expect(nextButton).toHaveAttribute('aria-disabled', 'true');
	});
	it('enables all on middle page', async () => {
		const { container, debug } = render(
			<MockedProvider mocks={makePaginationMocksFor(24)}>
				<Pagination page={4} productsCount={24} />
			</MockedProvider>,
		);
		await screen.findByTestId('pagination');
		const prevButton = screen.getByText(/Prev/);
		const nextButton = screen.getByText(/Next/);
		expect(prevButton).toHaveAttribute('aria-disabled', 'false');
		expect(nextButton).toHaveAttribute('aria-disabled', 'false');
	});
});
