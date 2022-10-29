import Image from 'next/image';
import Link from 'next/link';

import formatMoney from '../utils/formatMoney';
import { TEXT_NO_PRODUCT_DESCRIPTION } from '../utils/constants';
import { ProductProps } from '../types/commonTypes';
import StyledItem from './styles/StyledItem';
import StyledTitle from './styles/StyledTitle';
import StyledPriceTag from './styles/StyledPriceTag';
import { SupremeDescription } from './styles/Supreme';
import { LoadingSkeleton } from './loading';
import AddToCartButton from './AddToCartButton';
import DeleteProduct from './DeleteProduct';
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

	const isPhotoImageUrlDefined = !!product.photo?.image?.publicUrlTransformed;

	// TODO: Test loading state and loaded data state, maybe even handle error.
	return (
		<StyledItem>
			{isPhotoImageUrlDefined ? (
				<Image
					src={product.photo.image.publicUrlTransformed}
					alt={product.name}
					width="100%"
					height="100%"
					loading="eager"
				/>
			) : (
				loading && <LoadingSkeleton />
			)}
			<StyledTitle>
				<Link href={`/product/${product.id}`}>{product.name}</Link>
			</StyledTitle>
			<StyledPriceTag>{formatMoney(product.price)}</StyledPriceTag>
			<SupremeDescription>
				Description:
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
			</SupremeDescription>
			<div className="buttonList">
				<AddToCartButton id={product.id}>Add To Cart 🛒</AddToCartButton>
				<UpdateProductButton id={product.id}>Update ✏️</UpdateProductButton>
				<DeleteProduct id={product.id}>Delete 🗑️</DeleteProduct>
			</div>
		</StyledItem>
	);
};

export default ProductComponent;
