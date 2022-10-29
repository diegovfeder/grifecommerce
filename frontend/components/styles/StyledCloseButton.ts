import styled from 'styled-components';

const StyledCloseButton = styled.button`
	background: black;
	color: white;
	font-size: 3rem;
	border: 0;
	position: absolute;
	z-index: 2;
	right: 0;
	margin-top: 24px;
	padding: 8px;
	padding-right: 18px;
	padding-left: 18px;

	&:hover {
		color: white;
		background: red;
		cursor: pointer;
	}
`;

export default StyledCloseButton;
