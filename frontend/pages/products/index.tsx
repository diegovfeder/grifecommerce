// TODO: Fix error, query is not being passed from useRouter()
// can I mock it?
import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import PaginationComponent from '../../components/PaginationComponent';
import ProductsGridComponent from '../../components/ProductsGridComponent';
// TODO: How can I add vscode / graphql vscode reccomendations?
// If we have that similar to the dx we get from typescript,
// we could write files with .gql extension...
// -- on the other hand, the second option is to
// simply use a .ts file like this below...
import { PAGINATION_QUERY } from '../../gql/queries';

const ProductsPage = () => {
	const { query } = useRouter();
	const [queryPagination, { error, loading, data }] = useLazyQuery(
		PAGINATION_QUERY,
		{
			onCompleted: data => {
				console.log(data);
			},
		},
	);

	useEffect(() => {
		async () => {
			console.log('inside await');
			await queryPagination();
		};
		console.log('queryPagination', { data });
	}, []);

	const queryPageNumber = !!query?.page ? Number(query.page) : 1;
	return (
		<div>
			<PaginationComponent
				page={queryPageNumber || 1}
				productsCount={data?.productsCount}
			/>
			<ProductsGridComponent page={queryPageNumber || 1} />
			<PaginationComponent
				page={queryPageNumber || 1}
				productsCount={data?.productsCount}
			/>
		</div>
	);
};

export default ProductsPage;
