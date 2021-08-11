import CreateProduct from 'components/forms/CreateProduct';
import Head from 'next/head';

const Sell = () => {
	return (
		<>
			{/* TODO: This page should show in NavBar only if role is admin */}
			<Head>
				<title>GRIFE | Create Product</title>
			</Head>
			<CreateProduct />
		</>
	);
};

export default Sell;
