import SingleProduct from 'components/SingleProduct';

interface ISingleProductPage {
	query: any;
}

export default function SingleProductPage({ query }: ISingleProductPage) {
	return <SingleProduct id={query.id} />;
}
