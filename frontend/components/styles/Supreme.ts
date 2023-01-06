import styled from 'styled-components';

const Supreme = styled.h3`
	background: var(--primary);
	color: white;
	display: inline-block;
	padding: 4px 5px;
	margin: 0;
	font-size: 4rem;
`;

export const SupremeDescription = styled.h3`
	elevation: 10;
	shadow-color: #000;
	shadow-opacity: 0.1;
	shadow-radius: 10px;
	background: var(--lightestGray);
	text-transform: capitalize;
	display: inline-block;
	padding: 1px 2px;
	margin: 0;
	font-size: 2rem;
	padding-left: 1rem;
	min-height: 120px;
	max-height: 120px,
	border: 1px solid var(--black);
	overflow: 'scroll',


`;

export default Supreme;
