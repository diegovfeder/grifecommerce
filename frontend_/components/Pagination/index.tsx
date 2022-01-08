import { useQuery } from '@apollo/client';
import ErrorMessage from 'components/ErrorMessage';
import StyledPaginationContainer from 'components/styled/StyledPaginationContainer';
import StyledPagination from 'components/styled/StyledPagination';
import { totalProductsPerPage } from 'config';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
interface PaginationProps {
	page: any;
}

export const PAGINATION_QUERY = gql`
	query PAGINATION_QUERY {
		productsCount
	}
`;

const Pagination = ({ page }: PaginationProps) => {
	const { loading, data, error } = useQuery(PAGINATION_QUERY);
	const productsCount = data?.productsCount;
	const pagesTotal = Math.ceil(productsCount / totalProductsPerPage);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <ErrorMessage error={error} />;
	}

	return (
		<StyledPaginationContainer>
			<StyledPagination>
				<Head>
					{/* <script async src="https://cdn.splitbee.io/sb.js"></script> */}{' '}
					<title>
						GRIFE | Page {page} of {pagesTotal}
					</title>
				</Head>
				<Link href={`/home/${page - 1}`}>
					<a aria-disabled={page === 1}>← Prev</a>
				</Link>
				<p>
					Page {page} of {pagesTotal}
				</p>
				<p>Total Products: {productsCount}</p>
				<Link href={`/home/${page + 1}`}>
					<a aria-disabled={page === pagesTotal}>Next →</a>
				</Link>
			</StyledPagination>
		</StyledPaginationContainer>
	);
};

export default Pagination;
