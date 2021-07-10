import SingleProduct from 'components/SingleProduct';

interface ISingleProductPage {
	query: any;
}

const SingleProductPage = ({ query }: ISingleProductPage) => {
	return <SingleProduct id={query.id} />;
};

export default SingleProductPage;
