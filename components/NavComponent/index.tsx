import Link from 'next/link';
import { useUser } from 'components/UserComponent';
import SignOut from 'components/SignOut';
import StyledNav from '../styled/StyledNav';
import { useLocalState } from 'providers/cartState';
import CartQuantityLabel from 'components/CartQuantityLabel';
import Head from 'next/head';

const NavComponent = () => {
	const user = useUser();
	const localState = useLocalState();
	return (
		<StyledNav>
			{/* <Head> */}
			<Link href="/">SHOP</Link>
			{user ? (
				<>
					<Link href="/sell">SELL</Link>
					<Link href="/orders">ORDERS</Link>
					<Link href="/account">ACCOUNT</Link>
					<Link href="/blog">BLOG</Link>
					{/* <Link href="/mycart">MY CART</Link> */}
					<button type="button" onClick={localState?.openCart}>
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
			{/* </Head> */}
		</StyledNav>
	);
};

export default NavComponent;
