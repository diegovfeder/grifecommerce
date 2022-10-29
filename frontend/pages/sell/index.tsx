import CreateProduct from '../../components/CreateProduct';
import PleaseSignIn from '../../components/PleaseSignIn';
import Head from 'next/head';

const SellPage = () => {
	return (
		<>
			<Head>
				<title>GRIFE | Create Product</title>
			</Head>
			<PleaseSignIn>
				<div style={{ height: '200px' }}></div>
				<CreateProduct />
			</PleaseSignIn>
		</>
	);
};

export default SellPage;
