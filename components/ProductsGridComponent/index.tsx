import { ReactNode } from 'react';
import { Container } from './styles';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import ProductComponent from '../ProductComponent';
import { perPage } from 'config';

interface IProductsGridComponent {
	children?: ReactNode;
	page: any;
}

// Get Type of Product, use a common type import
// TODO: Create a folder with exporting types to use when we encouter common logic at different files
// interface IProduct {
// 	id: any;
// 	product: any;
// }

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

const ProductsGridComponent = ({ page, children }: IProductsGridComponent) => {
	const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
		variables: {
			skip: page * perPage - perPage,
			first: perPage,
		},
	});
	console.log(data, error, loading);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;
	return (
		<Container>
			<h1>ProductsGrid</h1>
			<div>
				<StyledProductsGrid>
					{data.allProducts.map(
						(
							// FIXME: remove any, type this properly
							product: any,
							// : IProduct
						) => (
							<ProductComponent key={product.id} product={product} />
						),
					)}
				</StyledProductsGrid>
			</div>
			{children}
		</Container>
	);
};

export default ProductsGridComponent;
