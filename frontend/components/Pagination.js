import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';
import { totalProductsPerPage } from '../config';

export const PAGINATION_QUERY = gql`
	query PAGINATION_QUERY {
		productsCount
	}
`;

// eslint-disable-next-line react/prop-types
export default function Pagination({ page }) {
	const { error, loading, data } = useQuery(PAGINATION_QUERY);
	if (loading) return 'Loading...';
	if (error) return <DisplayError error={error} />;
	const { productsCount } = data;
	const pagesTotal = Math.ceil(productsCount / totalProductsPerPage);
	return (
		<PaginationStyles>
			<Head>
				<title>
					GRIFE - Page {page} of {pagesTotal}
				</title>
			</Head>
			<Link href={`/products/${page - 1}`}>
				<a aria-disabled={page === 1}>← Prev</a>
			</Link>
			<p>
				Page {page} of {pagesTotal}
			</p>
			<p>{productsCount} Items Total</p>
			<Link href={`/products/${page + 1}`}>
				<a aria-disabled={page === pagesTotal}>Next →</a>
			</Link>
		</PaginationStyles>
	);
}
