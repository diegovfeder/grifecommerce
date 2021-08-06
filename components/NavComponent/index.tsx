import Link from 'next/link';
import { useUser } from 'components/UserComponent';
import SignOut from 'components/SignOut';
import StyledNav from '../styled/StyledNav';

const NavComponent = () => {
	const user = useUser();
	return (
		<StyledNav>
			{/* TODO: Myabe have a Home with some of our current info and then a Shop path for the products */}
			<Link href="/">SHOP</Link>
			{user ? (
				<>
					<Link href="/sell">SELL</Link>
					<Link href="/orders">ORDERS</Link>
					<Link href="/account">ACCOUNT</Link>
					<Link href="/mycart">MY CART</Link>
					<SignOut />
					{/* FIXME: Should SignOut be a link? or this is ok?  */}
					{/* <Link href="/signout">Sign Out</Link> */}
				</>
			) : (
				// TODO: Route to home after success
				<Link href="/signin">SIGN IN</Link>
			)}
		</StyledNav>
	);
};

export default NavComponent;
