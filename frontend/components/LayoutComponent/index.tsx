// FIXME: Question, is it usefule to have a layoutComponent?
import * as React from 'react';
import HeaderComponent from '../HeaderComponent';
import styled from 'styled-components';

type LayoutComponentProps = {
	title?: string;
};

const StyledLayout = styled.div`
	margin: 20;
	padding: 20;
	border: '1px solid #DDD';
`;

const LayoutComponent: React.FC<LayoutComponentProps> = ({
	children,
	title,
}) => (
	<StyledLayout>
		<HeaderComponent>
			<title>{title}</title>
			<meta charSet="utf-8" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		</HeaderComponent>
		{children}
	</StyledLayout>
);
export default LayoutComponent;
