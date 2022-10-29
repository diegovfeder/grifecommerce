import styled from 'styled-components';

export const StyledHeader = styled.header`
	.bar {
		border-bottom: 10px solid var(--black, black);
		display: grid;
		grid-template-columns: auto 1fr;
		justify-content: space-between;
		align-items: stretch;
		position: fixed;
		z-index: 999px;
		width: 100%;
		z-index: 100;
		background: white;
	}

	.sub-bar {
		top: 140px;
		z-index: 100;
		display: grid;
		grid-template-columns: 1fr auto;
		border-bottom: 1px solid var(--black, black);
		position: fixed;
		z-index: 999px;
		width: 100%;
	}
`;
