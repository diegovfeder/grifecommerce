import { ReactNode } from 'react';
import { Container } from './styles';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import ProductComponent from '../ProductComponent';
import { totalProductsPerPage } from 'config';
import { ProductProps } from 'types/commonTypes';

interface ProductsGridComponentProps {
	children?: ReactNode;
	page: any;
}

export const ALL_PRODUCTS_QUERY = gql`
	query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
		allProducts(skip: $skip, first: $first) {
			id
			name
			price
			description
			photo {
				id
				image {
					publicUrlTransformed
				}
			}
		}
	}
`;

const StyledProductsGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 60px;
`;

const ProductsGridComponent = ({
	page,
	children,
}: ProductsGridComponentProps) => {
	const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
		variables: {
			skip: page * totalProductsPerPage - totalProductsPerPage,
			first: totalProductsPerPage,
		},
	});
	// console.log(data, error, loading);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;
	return (
		<Container>
			<div>
				<StyledProductsGrid>
					{data?.allProducts?.map((product: ProductProps) => (
						<ProductComponent key={product.id} product={product} />
					))}
				</StyledProductsGrid>
			</div>
			{children}
		</Container>
	);
};

export default ProductsGridComponent;
