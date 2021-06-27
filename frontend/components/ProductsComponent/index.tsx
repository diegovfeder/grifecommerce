import { ReactNode } from 'react';
import { Container } from './styles';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import ProductComponent from '../ProductComponent';

interface ProductsComponentProps {
	children: ReactNode;
}

const ALL_PRODUCTS_QUERY = gql`
	query ALL_PRODUCTS_QUERY {
		allProducts {
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

const StyledProductsList = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 60px;
`;

function ProductsComponent({ children }: ProductsComponentProps) {
	const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);
	console.log(data, error, loading);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;
	return (
		<Container>
			<h1>ProductsComponent</h1>
			<div>
				<StyledProductsList>
					{data.allProducts.map(product => (
						<ProductComponent key={product.id} product={product} />
					))}
				</StyledProductsList>
			</div>
			{children}
		</Container>
	);
}

export default ProductsComponent;
