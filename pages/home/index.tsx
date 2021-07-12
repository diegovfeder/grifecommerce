import ProductsGridComponent from '../../components/ProductsGridComponent';
import Head from 'next/head';
import Pagination from 'components/Pagination';

// TODO: Render a footer component?
const Home = () => {
	return (
		<>
			<Pagination page={1} />
			{/* <Head>
				<title>GRIFE | Home</title>
			</Head> */}
			<ProductsGridComponent />
			<Pagination page={1} />
		</>
	);
};

export default Home;
