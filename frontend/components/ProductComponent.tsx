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

const ProductComponent = ({ product }: { product: ProductProps }) => {
	return (
		<StyledItem>
			{/* TODO: This image should be clickable too, route to /product/[id] page */}
			<Image
				src={product?.photo?.image?.publicUrlTransformed}
				alt={product.name}
				width={320}
				height={320}
			/>
			<StyledTitle>
				<Link href={`/product/${product.id}`}>{product.name}</Link>
			</StyledTitle>
			<StyledPriceTag>{formatMoney(product.price)}</StyledPriceTag>
			<p>{product.description}</p>
			<div className="buttonList">
				{/* TODO: Move this Update Product Button  */}
				{/* TODO: Also change its UI and wrap in a custom component  */}
				<Link
					href={{
						pathname: '/update-product',
						query: {
							id: product.id,
						},
					}}
				>
					Update ✏️
				</Link>
				<AddToCartButton id={product.id}>Add To Cart 🛒</AddToCartButton>
				<DeleteProduct id={product.id}>Delete</DeleteProduct>
			</div>
		</StyledItem>
	);
};

export default ProductComponent;
