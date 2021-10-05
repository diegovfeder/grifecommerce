/* eslint-disable @next/next/link-passhref */
import React, { Component } from 'react';
import { Container } from './styles';
import Image from 'next/image';
import Link from 'next/link';
import StyledProduct from '../styled/StyledProduct';
import StyledTitle from '../styled/StyledTitle';
import StyledPriceTag from '../styled/StyledPriceTag';
import formatMoney from 'util/formatMoney';
import DeleteProduct from 'components/DeleteProduct';
import AddToCartButton from 'components/AddToCartButton';
import { ProductProps } from 'types/commonTypes';

interface ProductComponentProps {
	product: ProductProps;
}

const ProductComponent = (props: ProductComponentProps) => {
	return (
		<Container>
			<StyledProduct>
				<Image
					src={props.product?.photo?.image?.publicUrlTransformed}
					alt={props.product.name}
					width={320}
					height={320}
				/>
				<StyledTitle>
					<Link href={`/product/${props.product.id}`}>
						{props.product.name}
					</Link>
				</StyledTitle>
				<StyledPriceTag>{formatMoney(props.product.price)}</StyledPriceTag>
				<p>{props.product.description}</p>
				<div className="buttonList">
					{/* TODO: Ternary render by Roles (adm or customer) should show different actions / buttons below */}
					<Link
						href={{
							pathname: `/update/${props.product.id}`,
						}}
					>
						Edit 📝
					</Link>
					<AddToCartButton id={props.product.id}>Add To Cart</AddToCartButton>
					{/* TODO: When I delete a Product, a ProductImage stays in db. Shouldn't I...
					 clean that image if it isn't being used in another Product?  */}
					<DeleteProduct id={props.product.id}>Delete</DeleteProduct>
				</div>
			</StyledProduct>
		</Container>
	);
};

export default ProductComponent;
