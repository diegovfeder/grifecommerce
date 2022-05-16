import { useRouter } from 'next/dist/client/router';
import Pagination from '../../components/Pagination';
import ProductsGridComponent from '../../components/ProductsGridComponent';

const ProductsPage = () => {
	const { query } = useRouter();

	const queryPageNumber = query.page ? Number(query.page) : 1;
	return (
		<div>
			<Pagination page={queryPageNumber || 1} />
			<ProductsGridComponent page={queryPageNumber || 1} />
			<Pagination page={queryPageNumber || 1} />
		</div>
	);
};

export default ProductsPage;
