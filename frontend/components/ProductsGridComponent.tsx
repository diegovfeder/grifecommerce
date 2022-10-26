import { useQuery } from '@apollo/client';

import { NUM_TOTAL_PRODUCTS_PER_PAGE } from '../utils/constants';
import { ProductProps } from '../types/commonTypes';
import PRODUCTS_QUERY from '../gql/queryProducts.gql';
import { StyledProductGrid } from './styles/StyledProductGrid';
import { ErrorMessage } from './error';
import { LoadingLabel } from './loading';
import ProductComponent from './ProductComponent';

interface ProductsGridComponentProps {
	page: number;
}

const ProductsGridComponent = ({ page }: ProductsGridComponentProps) => {
	const { loading, data, error } = useQuery(PRODUCTS_QUERY, {
		variables: {
			take: NUM_TOTAL_PRODUCTS_PER_PAGE,
			skip: page * NUM_TOTAL_PRODUCTS_PER_PAGE - NUM_TOTAL_PRODUCTS_PER_PAGE,
		},
		onCompleted: data => console.log(data),
	});

	if (error) return <ErrorMessage error={error} />;

	if (loading) return <LoadingLabel />;

	return (
		<StyledProductGrid>
			{data.products.map((product: ProductProps) => (
				<ProductComponent
					key={product.id}
					product={product}
					loading={loading}
				/>
			))}
		</StyledProductGrid>
	);
};

export default ProductsGridComponent;
