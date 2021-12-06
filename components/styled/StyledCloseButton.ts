import styled from 'styled-components';

const StyledCloseButton = styled.button`
	background: black;
	color: white;
	font-size: 6rem;
	border: 0;
	position: absolute;
	z-index: 2;
	right: 0;

	:hover {
		cursor: pointer;
	}
`;

export default StyledCloseButton;
