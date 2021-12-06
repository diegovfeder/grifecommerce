import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import Image from 'next/image';
import Head from 'next/head';
import styled from 'styled-components';
import ErrorMessage from 'components/ErrorMessage';

interface ISingleProduct {
	id: any;
}

const SINGLE_PRODUCT_QUERY = gql`
	query SINGLE_PRODUCT_QUERY($id: ID!) {
		Product(where: { id: $id }) {
			name
			description
			price
			id
			photo {
				altText
				image {
					publicUrlTransformed
				}
			}
		}
	}
`;

const StyledProduct = styled.div`
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

const SingleProduct = ({ id }: ISingleProduct) => {
	const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
		variables: {
			id,
		},
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <ErrorMessage error={error} />;

	const { Product } = data;

	return (
		<>
			<Head>
				{/* <script async src="https://cdn.splitbee.io/sb.js"></script> */}{' '}
				<title>GRIFE | {Product.name}</title>
			</Head>
			<StyledProduct className="details">
				<Image
					src={Product.photo.image.publicUrlTransformed}
					alt={Product.photo.altText}
					width={320}
					height={320}
				/>
				<div className="details">
					<h1>{Product.name}</h1>
					<h2>{Product.description}</h2>
					<h3>{Product.price}</h3>
				</div>
			</StyledProduct>
		</>
	);
};

export default SingleProduct;
