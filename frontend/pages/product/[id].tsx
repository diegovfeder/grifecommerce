import SingleProduct from '../../components/SingleProduct';

// TODO: Properly type this
interface ISingleProductPage {
	query: any;
}

// TODO: Style this page
const SingleProductPage = ({ query }: ISingleProductPage) => {
	return <SingleProduct id={query.id} />;
}

export default SingleProductPage;
