import styled from 'styled-components';
import StyledCart from './styles/StyledCart';
import CloseButton from './styles/CloseButton';
import Supreme from './styles/Supreme';
import formatMoney from '../util/formatMoney';
import { useUser } from './User';
import calcTotalPrice from '../util/calcTotalPrice';
import { useCart } from '../util/cartState';
import RemoveFromCart from './RemoveFromCart';
import { Checkout } from './Checkout';
import { CartItemProps } from '../types/commonTypes';

const CartItemStyles = styled.li`
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
		<CartItemStyles>
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
			<RemoveFromCart id={id} />
		</CartItemStyles>
	);
};

const Cart = () => {
	const me = useUser();
	const { cartOpen, closeCart } = useCart();
	if (!me) return null;
	return (
		<StyledCart open={cartOpen}>
			<header>
				<Supreme>{me.name}'s Cart</Supreme>
				<CloseButton onClick={closeCart}>&times;</CloseButton>
			</header>
			<ul>
				{me.cart.map((cartItem: CartItemProps) => (
					<CartItem key={cartItem.id} {...cartItem} />
				))}
			</ul>
			<footer>
				<p>{formatMoney(calcTotalPrice(me.cart))}</p>
				<Checkout />
			</footer>
		</StyledCart>
	);
};

export default Cart;
