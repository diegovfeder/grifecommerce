import styled from 'styled-components';
import React from 'react';
import { useQuery } from '@apollo/client';
import { totalProductsPerPage } from '../config';
import { ProductProps } from '../types/commonTypes';
import PRODUCTS_QUERY from '../gql/queryProducts.gql';
import ProductComponent from './ProductComponent';
import LoadingLabel from './loading/LoadingLabel';
import LoadingSkeleton from './loading/LoadingSkeleton';

interface ProductsGridComponentProps {
	page: number;
}

const ProductsGridComponent = ({ page }: ProductsGridComponentProps) => {
	const { loading, data, error } = useQuery(PRODUCTS_QUERY, {
		variables: {
			take: totalProductsPerPage,
			skip: page * totalProductsPerPage - totalProductsPerPage,
		},
		onCompleted: data => console.log(data),
	});

	if (loading)
		return (
			<>
				<LoadingLabel />
				<LoadingSkeleton />
			</>
		);

	if (error) return <p>Error: {error.message}</p>;

	return (
		<div>
			<ProductsListStyles>
				{data.products.map((product: ProductProps) => (
					<ProductComponent
						key={product.id}
						product={product}
						loading={loading}
					/>
				))}
			</ProductsListStyles>
		</div>
	);
};

const ProductsListStyles = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 60px;
`;

export default ProductsGridComponent;
