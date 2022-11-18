import styled from 'styled-components';

export const ProductStyles = styled.div`
	display: grid;
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
	max-width: var(--maxWidth);
	justify-content: center;
	align-items: top;
	gap: 2rem;
	transform: skew(-1deg);

	img {
		width: 100%;
		object-fit: contain;
	}

	.buttonList {
		color: #393939;
		display: grid;
		width: 100%;
		border-top: 1px solid var(--lightestGrey);
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		grid-gap: 1px;
		background: var(--lightGrey);

		& > * {
			background: white;
			border: 0;
			font-size: 1rem;
			padding: 1rem;
			cursor: pointer;

			&:hover {
				font-size: 1.1rem;
				cursor: pointer;
				text-decoration: underline;
			}
		}
	}
`;
