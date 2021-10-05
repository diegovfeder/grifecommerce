import Link from 'next/link';
import { useUser } from 'components/UserComponent';
import SignOut from 'components/SignOut';
import StyledNav from '../styled/StyledNav';
import { useLocalState } from 'hooks/cartState';
import CartQuantityLabel from 'components/CartQuantityLabel';

const NavComponent = () => {
	const user = useUser();
	const { openCart } = useLocalState();
	return (
		<StyledNav>
			{/* TODO: Maybe have a Home with some of our current info and then a Shop path for the products */}
			<Link href="/">SHOP</Link>
			{user ? (
				<>
					<Link href="/sell">SELL</Link>
					<Link href="/orders">ORDERS</Link>
					<Link href="/account">ACCOUNT</Link>
					{/* <Link href="/mycart">MY CART</Link> */}
					<button type="button" onClick={openCart}>
						My Cart
						<CartQuantityLabel
							count={user.cart.reduce(
								(tally: number, cartItem: { quantity: number }) =>
									tally + cartItem.quantity,
								0,
							)}
						/>
					</button>
					<SignOut />
				</>
			) : (
				// TODO: Route to home after success
				<Link href="/signin">SIGN IN</Link>
			)}
		</StyledNav>
	);
};

export default NavComponent;
