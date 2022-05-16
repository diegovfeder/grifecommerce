import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Image from 'next/image';
import Head from 'next/head';
import styled from 'styled-components';
import ErrorMessage from './ErrorMessage';

interface SingleProductProps {
	id: string;
}

export const SINGLE_ITEM_QUERY = gql`
	query SINGLE_ITEM_QUERY($id: ID!) {
		product(where: { id: $id }) {
			id
			name
			price
			description
			photo {
				id
				altText
				image {
					publicUrlTransformed
				}
			}
		}
	}
`;

const SingleProduct = ({ id }: SingleProductProps) => {
	const { loading, data, error } = useQuery(SINGLE_ITEM_QUERY, {
		variables: {
			id,
		},
	});

	if (loading) return <p>Loading...</p>;

	if (error) return <ErrorMessage error={error} />;

	const { product } = data;
	return (
		<ProductStyles>
			<Head>
				<title>GRIFE | {product.name}</title>
			</Head>
			<Image
				src={product.photo.image.publicUrlTransformed}
				alt={product.photo.altText}
				width={320}
				height={320}
			/>
			<div className="details">
				<h1>{product.name}</h1>
				<h2>{product.description}</h2>
				<h3>{product.price}</h3>
			</div>
		</ProductStyles>
	);
};

const ProductStyles = styled.div`
	display: grid;
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
	max-width: var(--maxWidth);
	justify-content: center;
	align-items: top;
	gap: 2rem;
	img {
		width: 100%;
		object-fit: contain;
	}
`;

export default SingleProduct;
