import Link from 'next/link';
import SignOut from './SignOut';
import CartCount from './CartCount';
import StyledNavigation from './styles/StyledNavigation';
import useCartState  from '../hooks/useCartState';
import useUserQuery  from '../hooks/useUserQuery';

const NavigationComponent = () => {
	const user = useUserQuery();
	const { openCart } = useCartState();
	return (
		<StyledNavigation>
			<Link href="/products">Products</Link>
			{user && (
				<>
					<Link href="/sell">Sell</Link>
					<Link href="/orders">Orders</Link>
					<Link href="/account">Account</Link>
					<SignOut />
					<button type="button" onClick={openCart}>
						My Cart
						<CartCount
							count={user.cart.reduce(
								(tally, cartItem) =>
									tally + (cartItem.product ? cartItem.quantity : 0),
								0
							)}
						/>
					</button>
				</>
			)}
			{!user && (
				<>
					<Link href="/signin">Sign In</Link>
				</>
			)}
		</StyledNavigation>
	);
}

export default NavigationComponent;
