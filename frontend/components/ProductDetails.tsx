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
import { ProductProps } from '../@types/commonTypes';
import ErrorMessage from './error/ErrorMessage';
import { LoadingSkeleton } from './loading';
import AddToCartButton from './AddToCartButton';
import DeleteProduct from './DeleteProduct';
import UpdateProductButton from './UpdateProductButton';
import SpaceContainer from './SpaceContainer';
import { ProductStyles } from './styles/StyledProductDetails';

interface ProductDetailsProps {
	id: string;
}

const StyledImage = styled(Image)`
	border: 1px solid black;
	background-color: var(--lightestGrey);

	@media (max-width: 768px) {
		width: 100%;
	}
`;

const ProductDetails = ({ id }: ProductDetailsProps) => {
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
				<SpaceContainer />
				<h1
					style={{
						borderBottom: '4px solid gray',
						fontWeight: '100',
						textTransform: 'capitalize',
					}}
				>
					{product.name}
				</h1>
				<Supreme>{formatMoney(product?.price)}</Supreme>
				{isPhotoImageUrlDefined ? (
					<StyledImage
						src={product?.photo?.image?.publicUrlTransformed || ''}
						alt={product?.photo?.altText || ''}
						width="auto"
						height="400px"
						loading="eager"
					/>
				) : (
					<LoadingSkeleton />
				)}
				<SupremeDescription>
					Description: {product?.description || TEXT_NO_PRODUCT_DESCRIPTION}
				</SupremeDescription>
				<div
					style={{
						display: 'flex',
						flex: 1,
						flexDirection: 'column',
					}}
				></div>
				<div className="buttonList">
					<AddToCartButton id={product.id}>Add To Cart 🛒</AddToCartButton>
					<UpdateProductButton id={product.id}>Update ✏️</UpdateProductButton>
					<DeleteProduct id={product.id}>Delete</DeleteProduct>
				</div>
			</div>
		</ProductStyles>
	);
};

export default ProductDetails;
