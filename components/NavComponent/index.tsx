import Link from 'next/link';
import { useUser } from 'components/UserComponent';
import SignOut from 'components/SignOut';
import StyledNav from '../styled/StyledNav';

const NavComponent = () => {
	const user = useUser();
	return (
		<StyledNav>
			<Link href="/">Home</Link>
			{user ? (
				<>
					<Link href="/sell">Sell</Link>
					<Link href="/orders">Orders</Link>
					<Link href="/account">Account</Link>
					<Link href="/mycart">My Cart</Link>
					<SignOut />
					{/* <Link href="/signout">Sign Out</Link> */}
				</>
			) : (
				<Link href="/signin">Sign In</Link>
				// TODO: Route to home after success
			)}
		</StyledNav>
	);
};

export default NavComponent;
