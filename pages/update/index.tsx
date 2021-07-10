import UpdateProduct from 'components/UpdateProduct';
import Head from 'next/head';

// TODO: Should I properly type this query?
interface IUpdateProductPage {
	query: any;
}

const UpdateProductPage = ({ query }: IUpdateProductPage) => {
	return (
		<>
			<Head>
				<title>GRIFE | Update Product</title>
			</Head>
			<UpdateProduct id={query.id} />
		</>
	);
};

export default UpdateProductPage;
