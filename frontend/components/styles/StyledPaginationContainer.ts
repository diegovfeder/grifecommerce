import styled from 'styled-components';

const StyledPaginationContainer = styled.div`
	display: flex;
	top: 180px;
	display: flex;
	justify-content: center;
	justify-items: center;
	align-items: center;
	z-index: 2;
	background-color: white;

	& :last-child {
		margin-top: 2rem;
		margin-bottom: 0;
	}
`;

export default StyledPaginationContainer;
