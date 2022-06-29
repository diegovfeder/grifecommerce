import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import StyledPagination from './styles/StyledPagination';
import { totalProductsPerPage } from '../config';

interface PaginationProps {
	page: number;
	productsCount: number;
}

const Pagination = ({ page, productsCount }: PaginationProps) => {
	// const productsCount = data?.productsCount;
	const pagesTotal = Math.ceil(productsCount / totalProductsPerPage);

	return (
		<StyledPaginationContainer data-test-id="pagination">
			<StyledPagination>
				<Head>
					<title>
						GRIFE | Page {page} of {pagesTotal}
					</title>
				</Head>
				<Link href={`/products/${page - 1}`}>
					<a aria-disabled={page === 1}>← Prev</a>
				</Link>
				<p data-test-id="pageCount">
					Page {page} of {pagesTotal}
				</p>
				<p>Total Products: {productsCount}</p>
				<Link href={`/products/${page + 1}`}>
					<a aria-disabled={page === pagesTotal}>Next →</a>
				</Link>
			</StyledPagination>
		</StyledPaginationContainer>
	);
};

const StyledPaginationContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	justify-items: center;
	align-items: center;
	margin-bottom: 2rem;

	& :last-child {
		margin-top: 2rem;
		margin-bottom: 0;
	}
`;

export default Pagination;
