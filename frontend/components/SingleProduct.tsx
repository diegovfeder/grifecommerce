import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import Image from 'next/image';
import Head from 'next/head';
import ErrorMessage from './ErrorMessage';
import { PRODUCT_QUERY } from '../gql/queries';
import LoadingLabel from './loading/LoadingLabel';
import LoadingSkeleton from './loading/LoadingSkeleton';
import Supreme, { SupremeDescription } from './styles/Supreme';
import formatMoney from '../utils/formatMoney';

interface SingleProductProps {
	id: string;
}

const SingleProduct = ({ id }: SingleProductProps) => {
	const { loading, data, error } = useQuery(PRODUCT_QUERY, {
		variables: {
			id,
		},
	});

	if (loading)
		return (
			<>
				<LoadingLabel />
				<LoadingSkeleton />
			</>
		);

	if (error) return <ErrorMessage error={error} />;

	const { product } = data;
	return (
		<ProductStyles data-test-id="singleProduct">
			<Head>
				<title>GRIFE | {product.name}</title>
			</Head>
			<div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
				<h1 style={{ borderBottom: '4px solid gray', fontWeight: '100' }}>
					{product.name}
				</h1>
				{/* TODO: Style this */}
				<Supreme>{formatMoney(product.price)}</Supreme>
				<Image
					src={product?.photo?.image?.publicUrlTransformed || ''}
					alt={product.photo.altText}
					width={'80%'}
					height={'80%'}
					loading="eager"
				/>
				{/* TODO: Style this */}
				<div className="details">
					<SupremeDescription>{product.description}</SupremeDescription>
				</div>
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
