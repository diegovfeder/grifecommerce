import Head from 'next/head';
import Link from 'next/link';
import StyledPagination from './styles/StyledPagination';
import StyledPaginationContainer from './styles/StyledPaginationContainer';
import { totalProductsPerPage } from '../config';

interface PaginationComponentProps {
	page: number;
	productsCount: number;
}

const PaginationComponent = ({
	page,
	productsCount,
}: PaginationComponentProps) => {
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

export default PaginationComponent;
