import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { totalProductsPerPage } from '../config';
import Product from './Product';

export const ALL_PRODUCTS_QUERY = gql`
	query ALL_PRODUCTS_QUERY($take: Int, $skip: Int = 0) {
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

const ProductsListStyles = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 60px;
`;

// eslint-disable-next-line react/prop-types
export default function Products({ page }) {
	const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
		variables: {
			take: totalProductsPerPage,
			skip: page * totalProductsPerPage - totalProductsPerPage,
		},
	});
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;
	return (
		<div>
			<ProductsListStyles>
				{data.products.map((product) => (
					<Product key={product.id} product={product} />
				))}
			</ProductsListStyles>
		</div>
	);
}
