import Link from 'next/link';

import useCartState from '../hooks/useCartState';
import useUserQuery from '../hooks/useUserQuery';
import { CartItemProps } from '../types/commonTypes';
import StyledNavigation from './styles/StyledNavigation';
import CartCount from './CartCount';
import SignOut from './SignOut';

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
