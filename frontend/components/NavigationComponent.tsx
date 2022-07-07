import Link from 'next/link';
import SignOut from './SignOut';
import CartCount from './CartCount';
import StyledNavigation from './styles/StyledNavigation';
import useCartState from '../hooks/useCartState';
import useUserQuery from '../hooks/useUserQuery';
import { CartItemProps } from '../types/commonTypes';

const NavigationComponent = () => {
	const user = useUserQuery();
	const { openCart } = useCartState();
	return (
		<StyledNavigation>
			<Link href="/products/1">PRODUCTS</Link>
			{user ? (
				<>
					<Link href="/sell">SELL</Link>
					<Link href="/orders">ORDERS</Link>
					<Link href="/account">ACCOUNT</Link>
					<SignOut />
					<button type="button" onClick={openCart}>
						MY CART
						<CartCount
							count={user.cart.reduce(
								(tally: number, cartItem: CartItemProps) =>
									tally + (cartItem.product ? cartItem.quantity : 0),
								0,
							)}
						/>
					</button>
				</>
			) : (
				<>
					<Link href="/signin">SIGN IN</Link>
				</>
			)}
		</StyledNavigation>
	);
};

export default NavigationComponent;
