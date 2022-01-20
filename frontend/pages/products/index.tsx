import { useRouter } from 'next/dist/client/router';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

const ProductsPage = () => {
	const { query } = useRouter();
	// FIXME: Create tests for this. Check when it return an array.
	// Q: How do I remove the value from this string array and transform to a simple number
	// const pageNumber = parseInt(query?.page);
	const queryPageNumber = query.page ? Number(query.page) : 1;
	return (
		<div>
			<Pagination page={queryPageNumber || 1} />
			<Products page={queryPageNumber || 1} />
			<Pagination page={queryPageNumber || 1} />
		</div>
	);
};

export default ProductsPage;
