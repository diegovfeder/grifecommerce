import { ApolloError, useQuery } from '@apollo/client';
import { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import styled from 'styled-components';

import Supreme, { SupremeDescription } from './styles/Supreme';
import formatMoney from '../utils/formatMoney';
import {
	TEXT_NO_PRODUCT_NAME,
	TEXT_NO_PRODUCT_DESCRIPTION,
} from '../utils/constants';
import { PRODUCT_QUERY } from '../gql/queries';
import { ProductProps } from '../types/commonTypes';
import ErrorMessage from './error/ErrorMessage';
import { LoadingSkeleton } from './loading';
import AddToCartButton from './AddToCartButton';
import DeleteProduct from './DeleteProduct';
import UpdateProductButton from './UpdateProductButton';

interface SingleProductProps {
	id: string;
}

const SingleProduct = ({ id }: SingleProductProps) => {
	const [product, setProduct] = useState<ProductProps | null>(null);
	const { loading, error } = useQuery(PRODUCT_QUERY, {
		variables: {
			id,
		},
		skip: !id,
		onCompleted: (data: { product: ProductProps }) => {
			setProduct(data.product);
		},
	});

	if (loading) return <LoadingSkeleton />;

	if (error) return <ErrorMessage error={error} />;

	if (!product) {
		return (
			<ProductStyles data-test-id="single-product-component-null">
				<Head>
					<title>GRIFE | {TEXT_NO_PRODUCT_NAME}</title>
				</Head>
				<ErrorMessage
					error={
						new ApolloError({
							errorMessage: 'Product not found.',
						})
					}
				/>
			</ProductStyles>
		);
	}

	const isPhotoImageUrlDefined = !!product?.photo?.image?.publicUrlTransformed;

	return (
		<ProductStyles data-test-id="single-product-component">
			<Head>
				<title>GRIFE | {product?.name || TEXT_NO_PRODUCT_NAME}</title>
			</Head>
			<div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
				<h1 style={{ borderBottom: '4px solid gray', fontWeight: '100' }}>
					{product.name}
				</h1>
				<Supreme>{formatMoney(product?.price)}</Supreme>
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
						{product?.description || TEXT_NO_PRODUCT_DESCRIPTION}
					</SupremeDescription>
				</div>
				<div className="buttonList">
					<AddToCartButton id={product.id}>Add To Cart 🛒</AddToCartButton>
					<UpdateProductButton id={product.id}>Update ✏️</UpdateProductButton>
					<DeleteProduct id={product.id}>Delete</DeleteProduct>
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
