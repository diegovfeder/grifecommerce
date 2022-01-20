import CreateProduct from 'components/forms/CreateProduct';
import Head from 'next/head';

//TODO: This page should show in NavBar only if role is admin
const Sell = () => {
	return (
		<>
			<Head>
				<title>GRIFE | Create Product</title>
			</Head>
			<CreateProduct />
		</>
	);
};

export default Sell;