import Head from 'next/head';

import CreateProduct from '../../components/CreateProduct';
import PleaseSignIn from '../../components/PleaseSignIn';

const SellPage = () => {
	return (
		<>
			<Head>
				<title>GRIFE | Sell a product</title>
			</Head>
			<PleaseSignIn>
				<div style={{ height: '200px' }}></div>
				<CreateProduct />
			</PleaseSignIn>
		</>
	);
};

export default SellPage;
