import CreateProduct from 'components/forms/CreateProduct';
import Head from 'next/head';

//TODO: This path should be accessible only if userRole is admin
const Create = () => {
	return (
		<>
			<Head>
				<title>GRIFE | Create Product</title>
			</Head>
			<CreateProduct />
		</>
	);
};

export default Create;
