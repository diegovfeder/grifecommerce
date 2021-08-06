import ProductsGridComponent from 'components/ProductsGridComponent';
import Pagination from 'components/Pagination';
import { useRouter } from 'next/router';

const Home = () => {
	const { query } = useRouter();
	// FIXME: Create tests for this. Check when it return an array.
	// Q: How do I remove the value from this string array and transform to a simple number
	const pageNumber = parseInt(query.page);
	return (
		<>
			{/* TODO: pagination last-of-type className should have margin-top and no margin-bottom */}
			<Pagination page={pageNumber || 1} />
			<ProductsGridComponent page={pageNumber || 1} />
			<Pagination page={pageNumber || 1} />
		</>
	);
};

export default Home;
