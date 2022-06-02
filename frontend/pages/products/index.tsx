import { gql, useQuery } from '@apollo/client';
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
	const { error, loading, data } = useQuery(PAGINATION_QUERY);

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
