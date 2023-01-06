import { ReactNode } from 'react';
import styled from 'styled-components';
import HeaderComponent from './HeaderComponent';
import { GlobalStyles } from './styles/GlobalStyles';

interface PageComponentProps {
	children?: ReactNode;
}

const InnerStyles = styled.div`
	max-width: var(--maxWidth);
	margin: 0 auto;
	padding: 2rem;
`;

const Page = ({ children }: PageComponentProps) => {
	return (
		<div>
			<GlobalStyles />
			<HeaderComponent />
			<InnerStyles>{children}</InnerStyles>
		</div>
	);
};

export default Page;
