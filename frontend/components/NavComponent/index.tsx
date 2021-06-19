import Link from 'next/link';

const NavComponent: React.FC = () => {
	return (
		<nav>
			<Link href="/">Home</Link>
			<Link href="/shop">Shop</Link>
			<Link href="/orders">Orders</Link>
			<Link href="/account">Account</Link>
			<Link href="/mycart">My Cart</Link>
		</nav>
	);
};

export default NavComponent;
