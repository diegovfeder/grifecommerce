import UpdateProduct from 'components/UpdateProduct';
import Head from 'next/head';

// TODO: Should I properly type this query?
interface IUpdateProductPage {
	query: any;
}

// TODO: Should the '/update' path actually present itself as a list of components thac you could click
// or search to then update its values?..
// because the 'update/[id]' path is what renders an UpdateProductComponent (form) to update a specifical product id...
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
