import ProductsGridComponent from '../../components/ProductsGridComponent';
import Head from 'next/head';

// TODO: Should I create a footer here? or for index.tsx another
const Home = () => {
	return (
		<>
			<Head>
				<title>GRIFE | Home</title>
			</Head>
			<ProductsGridComponent />
		</>
	);
};

export default Home;
