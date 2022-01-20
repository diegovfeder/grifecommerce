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


export default function Product({ product }: {product: ProductProps}) {
	return (
		<StyledItem>
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
				<Link
					href={{
						pathname: '/update',
						query: {
							id: product.id,
						},
					}}
				>
					Edit ✏️
				</Link>
				<AddToCartButton id={product.id}>Add To Cart 🛒</AddToCartButton>
				<DeleteProduct id={product.id}>Delete</DeleteProduct>
			</div>
		</StyledItem>
	);
}
