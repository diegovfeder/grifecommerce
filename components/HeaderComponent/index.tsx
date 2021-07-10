import Link from 'next/link';
import NavComponent from '../NavComponent';
import styled from 'styled-components';

const Logo = styled.h1`
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

const HeaderComponent: React.FC = () => {
	return (
		<StyledHeader>
			<div className="bar">
				<Logo>
					<Link href="/">GRIFE</Link>
				</Logo>
				<NavComponent />
			</div>
			<div className="sub-bar">
				{/* TODO: Create Search Component */}
				<p>TODO: Search</p>
			</div>
		</StyledHeader>
	);
};

export default HeaderComponent;
