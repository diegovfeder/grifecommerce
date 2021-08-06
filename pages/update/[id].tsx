import UpdateProduct from 'components/forms/UpdateProduct';
import Head from 'next/head';
import { useRouter } from 'next/router';
// TODO: Should I properly type this query?
interface IUpdateProductPage {
	query: any;
}

const UpdateProductPage = ({ query }: IUpdateProductPage) => {
	const router = useRouter();
	const { id } = router.query;
	console.log({ id });
	return (
		<>
			<Head>
				<title>GRIFE | Update Product</title>
			</Head>
			{/* TODO: Render image of product here */}
			{/* <ProductImage id={query.id} product={{}}> */}
			<UpdateProduct id={query.id} />
		</>
	);
};

export default UpdateProductPage;
