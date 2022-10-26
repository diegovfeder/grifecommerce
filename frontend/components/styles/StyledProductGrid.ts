import styled from 'styled-components';

const StyledProductGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 60px;

	@media (max-width: 1800px) {
		grid-template-columns: 1fr 1fr;
	}

	@media (max-width: 560px) {
		grid-template-columns: 1fr;
	}
`;

export { StyledProductGrid };
