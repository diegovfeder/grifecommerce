import { useQuery } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import { LoadingLabel } from '../../components/loading';
import PaginationComponent from '../../components/PaginationComponent';
import ProductsGridComponent from '../../components/ProductsGridComponent';
import { PRODUCTS_COUNT_QUERY } from '../../gql/queries';
import ErrorMessage from '../../components/ErrorMessage';

const ProductsPage = () => {
	const { query } = useRouter() || { query: { page: 1 } };
	const { error, loading, data } = useQuery(PRODUCTS_COUNT_QUERY);

	if (loading) return <LoadingLabel />;

	if (error) return <ErrorMessage error={error} />;

	const queryPageNumber = !!query?.page ? Number(query.page) : 1;

	return (
		<div>
			<PaginationComponent
				page={queryPageNumber || 1}
				productsCount={data?.productsCount || 0}
			/>
			<ProductsGridComponent page={queryPageNumber || 1} />
			<PaginationComponent
				page={queryPageNumber || 1}
				productsCount={data?.productsCount || 0}
			/>
		</div>
	);
};

export default ProductsPage;
