import styled from 'styled-components';
import { Checkout } from './Checkout';
import RemoveFromCartButton from './RemoveFromCartButton';
import Supreme from './styles/Supreme';
import StyledCart from './styles/StyledCart';
import StyledCloseButton from './styles/StyledCloseButton';
import useCartState from '../hooks/useCartState';
import useUserQuery  from '../hooks/useUserQuery';
import formatMoney from '../utils/formatMoney';
import calcTotalPrice from '../utils/calcTotalPrice';
import { CartItemProps } from '../types/commonTypes';

const StyledCartItem = styled.li`
	padding: 1rem 0;
	border-bottom: 1px solid var(--lightGrey);
	display: grid;
	grid-template-columns: auto 1fr auto;
	img {
		margin-right: 1rem;
	}
	h3,
	p {
		margin: 0;
	}
`;

const CartItem = ({ id, quantity, product }: CartItemProps) => {
	if (!product) return null;
	return (
		<StyledCartItem>
			<img
				width="100"
				src={product.photo.image.publicUrlTransformed}
				alt={product.name}
			/>
			<div>
				<h3>{product.name}</h3>
				<p>
					{formatMoney(product.price * quantity)}-
					<em>
						{quantity} &times; {formatMoney(product.price)} each
					</em>
				</p>
			</div>
			<RemoveFromCartButton id={id} />
		</StyledCartItem>
	);
};

const CartComponent = () => {
	const user = useUserQuery();
	const { cartOpen, closeCart } = useCartState();
	if (!user) return null;
	return (
		<StyledCart open={cartOpen}>
			<header>
				<Supreme>{user.name}'s Cart</Supreme>
				<StyledCloseButton onClick={closeCart}>&times;</StyledCloseButton>
			</header>
			<ul>
				{user.cart.map((cartItem: CartItemProps) => (
					<CartItem key={cartItem.id} {...cartItem} />
				))}
			</ul>
			<footer>
				<p>{formatMoney(calcTotalPrice(user.cart))}</p>
				<Checkout />
			</footer>
		</StyledCart>
	);
};

export default CartComponent;
