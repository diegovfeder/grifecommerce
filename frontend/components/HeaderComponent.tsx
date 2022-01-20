import Link from 'next/link';
import styled from 'styled-components';
import CartComponent from './CartComponent';
import NavigationComponent from './NavigationComponent';
import SearchComponent from './SearchComponent';

const HeaderComponent = () => {
	return (
		<StyledHeader>
			<div className="bar">
				<StyledLogo>
					<Link href="/">GRIFE</Link>
				</StyledLogo>
				<NavigationComponent />
			</div>
			<div className="sub-bar">
				<SearchComponent />
			</div>
			<CartComponent />
		</StyledHeader>
	);
};

// FIXME: Update UI on smaller screens.
// Add responsiveness to header buttons and logo.
const StyledLogo = styled.h1`
	font-size: 4rem;
	margin-left: 2rem;
	position: relative;
	z-index: 2;
	background: red;
	transform: skew(-7deg);
	a {
		color: white;
		text-decoration: none;
		text-transform: uppercase;
		padding: 0.5rem 1rem;
	}
`;

const StyledHeader = styled.header`
	.bar {
		border-bottom: 10px solid var(--black, black);
		display: grid;
		grid-template-columns: auto 1fr;
		justify-content: space-between;
		align-items: stretch;
	}

	.sub-bar {
		display: grid;
		grid-template-columns: 1fr auto;
		border-bottom: 1px solid var(--black, black);
	}
`;

export default HeaderComponent;
