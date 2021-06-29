/* eslint-disable @next/next/link-passhref */
import StyledProduct from '../styled/StyledProduct';
import StyledTitle from '../styled/StyledTitle';
import { Container } from './styles';
import Image from 'next/image';
import Link from 'next/link';
import StyledPriceTag from '../styled/StyledPriceTag';
import formatMoney from 'util/formatMoney';
import React from 'react';
import DeleteProduct from 'components/DeleteProduct';
// import DeleteProduct from 'components/DeleteProduct';

interface ProductComponentProps {
	product: {
		id: string;
		name: string;
		price: number;
		description: string;
		photo: {
			image: {
				publicUrlTransformed: string;
			};
		};
	};
}

function ProductComponent({ product }: ProductComponentProps) {
	return (
		<Container>
			<StyledProduct>
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
				{/* TODO: Add button for edit and delete item */}
				<div className="buttonList">
					<Link
						href={{
							pathname: 'update',
							query: {
								id: product.id,
							},
						}}
					>
						Edit 📝
					</Link>
					{/* <Link
						href={{
							pathname: 'delete',
							query: {
								id: product.id,
							},
						}}
					> */}
					{/* Delete ❎ */}
					{/* <DeleteProduct></DeleteProduct> */}
					{/* </Link> */}
					{/* TODO: Create Shopping Cart */}
					{/* <AddToCart id={product.id} /> */}
					{/* FIXME: When I delete a Product, a ProductImage stays in db. Shouldn't I...
					 clean that image if it isn't being used in another Product?  */}
					<DeleteProduct id={product.id}>Delete</DeleteProduct>
				</div>
			</StyledProduct>
		</Container>
	);
}

export default ProductComponent;
