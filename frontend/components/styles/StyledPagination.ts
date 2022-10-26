import styled from 'styled-components';

const StyledPagination = styled.div`
	text-align: center;
	display: inline-grid;
	grid-template-columns: repeat(4, auto);
	align-items: center;
	align-self: center;
	justify-self: center;
	justify-content: center;
	align-content: center;
	margin: 1rem 0;
	border: 1px solid var(--lightGrey);
	border-radius: 10px;
	white-space: nowrap;
	font-size: 1rem;
	font-size: 1.5vw;

	@media only screen and (min-width: 2401px) {
		a,
		p {
			font-size: 0.6vw;
		}
	}

	@media only screen and (max-width: 2400px) {
		a,
		p {
			font-size: 0.8vw;
		}
	}

	@media only screen and (max-width: 1800px) {
		a,
		p {
			font-size: 1.2vw;
		}
	}

	@media only screen and (max-width: 1200px) {
		a,
		p {
			font-size: 1.6vw;
		}
	}

	@media only screen and (max-width: 768px) {
		a,
		p {
			font-size: 2vw;
		}
	}

	& > * {
		margin: 0;
		padding: 8px 16px;
		border-right: 1px solid var(--lightGrey);
		&:last-child {
			border-right: 0;
		}
	}

	a[aria-disabled='true'] {
		color: grey;
		pointer-events: none;
	}
`;

export default StyledPagination;
