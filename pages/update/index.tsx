import Head from 'next/head';

// TODO: Should I properly type this query?
interface IUpdateProductPage {
	query: any;
}

// TODO: Should the '/update' path actually present itself as a list of components that you could click
// or search to then update its values?..
// because the 'update/[id]' path is what renders an UpdateProductComponent (form) to update a specifical product id...
const UpdateProductPage = ({ query }: IUpdateProductPage) => {
	return (
		<>
			<Head>
				{/* <script async src="https://cdn.splitbee.io/sb.js"></script> */}{' '}
				<title>GRIFE | Product List</title>
			</Head>
			<h1>TODO: Render a list of products to then update?..</h1>
		</>
	);
};

export default UpdateProductPage;
