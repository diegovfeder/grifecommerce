import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import Image from 'next/image';
import Head from 'next/head';
import ErrorMessage from './ErrorMessage';
import { PRODUCT_QUERY } from '../gql/queries';
import { LoadingSkeleton } from './loading';
import Supreme, { SupremeDescription } from './styles/Supreme';
import formatMoney from '../utils/formatMoney';
import { TEXT_NO_DESCRIPTION } from '../utils/constants';

interface SingleProductProps {
	id: string;
}

const SingleProduct = ({ id }: SingleProductProps) => {
	const { loading, data, error } = useQuery(PRODUCT_QUERY, {
		variables: {
			id,
		},
		onCompleted: data => {
			console.log({ data });
		},
	});

	if (loading) return <LoadingSkeleton />;

	if (error) return <ErrorMessage error={error} />;

	const { product } = data;
	const isPhotoImageUrlDefined = !!product.photo?.image?.publicUrlTransformed;

	return (
		<ProductStyles data-test-id="singleProduct">
			<Head>
				<title>GRIFE | {product.name}</title>
			</Head>
			<div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
				<h1 style={{ borderBottom: '4px solid gray', fontWeight: '100' }}>
					{product.name}
				</h1>
				<Supreme>{formatMoney(product.price)}</Supreme>
				{isPhotoImageUrlDefined ? (
					<Image
						src={product?.photo?.image?.publicUrlTransformed || ''}
						alt={product?.photo?.altText || ''}
						width="80%"
						height="80%"
						loading="eager"
					/>
				) : (
					<LoadingSkeleton />
				)}
				<div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
					<SupremeDescription>
						{product?.description || TEXT_NO_DESCRIPTION}
					</SupremeDescription>
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
