import { useUser } from 'components/UserComponent';
import Link from 'next/link';
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
				</>
			) : (
				<Link href="/signin">Sign In</Link>
			)}
		</StyledNav>
	);
};

export default NavComponent;
