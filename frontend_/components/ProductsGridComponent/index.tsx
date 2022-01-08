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

export const PRODUCTS_QUERY = gql`
	query PRODUCTS_QUERY($take: Int, $skip: Int = 0) {
		products(take: $take, skip: $skip) {
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
	const { data, error, loading } = useQuery(PRODUCTS_QUERY, {
		variables: {
			take: totalProductsPerPage,
			skip: page * totalProductsPerPage - totalProductsPerPage,
		},
	});
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
