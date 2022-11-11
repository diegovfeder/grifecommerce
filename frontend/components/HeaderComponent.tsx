import Link from 'next/link';

import CartComponent from './CartComponent';
import NavigationComponent from './NavigationComponent';
import SearchComponent from './SearchComponent';
import { StyledLogo } from './styles/StyledLogo';
import { StyledHeader } from './styles/StyledHeader';

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

export default HeaderComponent;
