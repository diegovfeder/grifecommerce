// TODO: Fix error, query is not being passed from useRouter() on tests too
// can I mock it?
import { useQuery, useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import { LoadingLabel } from '../../components/loading';
import PaginationComponent from '../../components/PaginationComponent';
import ProductsGridComponent from '../../components/ProductsGridComponent';
// TODO: How can I add vscode / graphql vscode reccomendations?
// If we have that similar to the dx we get from typescript,
// we could write files with .gql extension...
// -- on the other hand, the second option is to
// simply use a .ts file like this below...
import { PRODUCTS_COUNT_QUERY } from '../../gql/queries';
import ErrorMessage from '../../components/ErrorMessage';

const ProductsPage = () => {
	const { query } = useRouter();
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
