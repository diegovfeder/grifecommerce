import SingleProduct from '../../components/SingleProduct';

interface ISingleProductPage {
	query: {
		id: string;
	};
}

// TODO: Style this page / component
const SingleProductPage = ({ query }: ISingleProductPage) => {
	return <SingleProduct id={query.id} />;
};

export default SingleProductPage;
