import Link from 'next/link';
import StyledNav from '../styles/StyledNav';

const NavComponent: React.FC = () => {
	return (
		<StyledNav>
			<Link href="/">Home</Link>
			<Link href="/sell">sell</Link>
			<Link href="/orders">Orders</Link>
			<Link href="/account">Account</Link>
			<Link href="/mycart">My Cart</Link>
		</StyledNav>
	);
};

export default NavComponent;
