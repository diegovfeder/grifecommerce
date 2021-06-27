import StyledItem from '../styles/StyledItem';
import StyledTitle from '../styles/StyledTitle';
import { Container } from './styles';
import Image from 'next/image';
import Link from 'next/link';
import StyledPriceTag from '../styles/StyledPriceTag';
import formatMoney from 'util/formatMoney';

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
				{/* TODO: Add button for edit and delete item */}
			</StyledItem>
		</Container>
	);
}

export default ProductComponent;
