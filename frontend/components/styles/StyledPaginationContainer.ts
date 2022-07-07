import styled from 'styled-components';

const StyledPaginationContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	justify-items: center;
	align-items: center;
	margin-bottom: 2rem;

	& :last-child {
		margin-top: 2rem;
		margin-bottom: 0;
	}
`;

export default StyledPaginationContainer;
