import SingleProduct from 'components/SingleProduct';

interface ISingleProductPage {
	query: any;
}

const SingleProductPage = ({ query }: ISingleProductPage) => {
	return (
		<>
			<h1>TODO: Style this page</h1>
			<SingleProduct id={query.id} />
		</>
	);
};

export default SingleProductPage;
