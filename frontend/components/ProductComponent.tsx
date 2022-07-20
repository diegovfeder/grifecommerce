import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import StyledItem from './styles/StyledItem';
import StyledTitle from './styles/StyledTitle';
import StyledPriceTag from './styles/StyledPriceTag';
import formatMoney from '../utils/formatMoney';
import DeleteProduct from './DeleteProduct';
import AddToCartButton from './AddToCartButton';
import { ProductProps } from '../types/commonTypes';
import { SupremeDescription } from './styles/Supreme';
import { LoadingSkeleton } from './loading';
import { TEXT_NO_PRODUCT_DESCRIPTION } from '../utils/constants';
import UpdateProductButton from './UpdateProductButton';

const ProductComponent = ({
	product,
	loading,
}: {
	product: ProductProps;
	loading?: boolean;
}) => {
	// FIXME:
	// Where is this query coming from?
	// Why does it take so long for the image to load?..
	// Pass down loading...

	const isPhotoImageUrlDefined = !!product.photo?.image?.publicUrlTransformed;

	return (
		<StyledItem>
			{!!loading ? (
				<LoadingSkeleton />
			) : (
				<>
					{isPhotoImageUrlDefined ? (
						<Image
							src={product.photo.image.publicUrlTransformed}
							alt={product.name}
							width="100%"
							height="100%"
						/>
					) : (
						<LoadingSkeleton />
					)}
				</>
			)}
			<StyledTitle>
				<Link href={`/product/${product.id}`}>{product.name}</Link>
			</StyledTitle>
			<StyledPriceTag>{formatMoney(product.price)}</StyledPriceTag>
			<SupremeDescription>Description:</SupremeDescription>
			<p
				style={{
					marginTop: 0,
					marginBottom: 0,
					paddingTop: '1rem',
					paddingBottom: '2rem',
					fontSize: '1.5rem',
					maxHeight: '120px',
					overflow: 'scroll',
				}}
			>
				{product?.description || TEXT_NO_PRODUCT_DESCRIPTION}
			</p>
			<div className="buttonList">
				<UpdateProductButton id={product.id}>Update ✏️</UpdateProductButton>
				<AddToCartButton id={product.id}>Add To Cart 🛒</AddToCartButton>
				<DeleteProduct id={product.id}>Delete</DeleteProduct>
			</div>
		</StyledItem>
	);
};

export default ProductComponent;
