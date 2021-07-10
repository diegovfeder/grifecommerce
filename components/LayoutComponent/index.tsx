// FIXME: Question, is it usefule to have a layoutComponent?
import React, { ReactNode } from 'react';
import HeaderComponent from '../HeaderComponent';
import styled from 'styled-components';

type LayoutComponentProps = {
	children: ReactNode;
	title?: string;
};

const StyledLayout = styled.div`
	margin: 20;
	padding: 20;
	border: '1px solid #DDD';
`;

const LayoutComponent = ({ children, title }: LayoutComponentProps) => (
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
