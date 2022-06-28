import { useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import Pagination from '../../components/Pagination';
import ProductsGridComponent from '../../components/ProductsGridComponent';

const PAGINATION_QUERY = gql`
	query PAGINATION_QUERY {
		productsCount
	}
`;

const ProductsPage = () => {
	const { query } = useRouter();
	const [queryPagination, { error, loading, data }] =
		useLazyQuery(PAGINATION_QUERY);

	useEffect(() => {
		queryPagination();
	});

	const queryPageNumber = query.page ? Number(query.page) : 1;
	return (
		<div>
			<Pagination
				page={queryPageNumber || 1}
				productsCount={data?.productsCount}
			/>
			<ProductsGridComponent page={queryPageNumber || 1} />
			<Pagination
				page={queryPageNumber || 1}
				productsCount={data?.productsCount}
			/>
		</div>
	);
};

export default ProductsPage;
