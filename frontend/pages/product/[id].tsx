import SingleProduct from '../../components/SingleProduct';

interface ISingleProductPage {
	query: {
		id: string;
	};
}

// TODO: Do we have state being handled in this page/component?
// Should we check for loading, and error?
const SingleProductPage = ({ query }: ISingleProductPage) => {
	return <SingleProduct id={query?.id || ''} />;
};

export default SingleProductPage;
