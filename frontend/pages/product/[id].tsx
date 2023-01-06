import ProductDetails from '../../components/ProductDetails';

interface IProductDetailsPage {
	query: {
		id: string;
	};
}

const ProductDetailsPage = ({ query }: IProductDetailsPage) => {
	return <ProductDetails id={query?.id || ''} />;
};

export default ProductDetailsPage;
