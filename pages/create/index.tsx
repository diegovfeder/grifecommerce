import CreateProduct from 'components/forms/CreateProduct';
import Head from 'next/head';

const Create = () => {
	return (
		<>
			{/* TODO: This path should be accessible only if userRole is admin */}
			<Head>
				<title>GRIFE | Create Product</title>
			</Head>
			<CreateProduct />
		</>
	);
};

export default Create;
