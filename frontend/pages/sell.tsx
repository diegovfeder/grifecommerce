import CreateProduct from '../components/CreateProduct';
import PleaseSignIn from '../components/PleaseSignIn';
import Head from 'next/head';

const SellPage = () => {
	return (
		<>
			<Head>
				<title>GRIFE | Create Product</title>
			</Head>
			<PleaseSignIn>
				<CreateProduct />
			</PleaseSignIn>
		</>
	);
};

export default SellPage;
