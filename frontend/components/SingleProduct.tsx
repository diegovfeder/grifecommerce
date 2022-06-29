import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import Image from 'next/image';
import Head from 'next/head';
import ErrorMessage from './ErrorMessage';
import { PRODUCT_QUERY } from '../gql/queries';
import LoadingLabel from './loading/LoadingLabel';

interface SingleProductProps {
	id: string;
}

const SingleProduct = ({ id }: SingleProductProps) => {
	const { loading, data, error } = useQuery(PRODUCT_QUERY, {
		variables: {
			id,
		},
	});

	if (loading) return <LoadingLabel />;

	if (error) return <ErrorMessage error={error} />;

	const { product } = data;
	return (
		<ProductStyles data-test-id="singleProduct">
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
