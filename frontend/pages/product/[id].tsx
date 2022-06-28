import SingleProduct from '../../components/SingleProduct';

interface ISingleProductPage {
	query: {
		id: string;
	};
}

const SingleProductPage = ({ query }: ISingleProductPage) => {
	return <SingleProduct id={query?.id || ''} />;
};

export default SingleProductPage;
