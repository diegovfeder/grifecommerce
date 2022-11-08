import styled from 'styled-components';

export const StyledDot = styled.div`
	background: var(--red);
	color: white;
	border-radius: 50%;
	padding: 0.5rem;
	line-height: 2rem;
	min-width: 3rem;
	margin-left: 1rem;
	margin-bottom: 1rem;
	font-feature-settings: 'tnum';
	font-variant-numeric: tabular-nums;
`;

export const StyledDotAnimation = styled.span`
	position: relative;

	.count {
		display: block;
		position: relative;
		transition: transform 0.4s;
		backface-visibility: hidden;
	}

	.count-enter {
		transform: scale(4) rotateX(0.5turn);
	}

	.count-enter-active {
		transform: rotateX(0);
	}

	.count-exit {
		top: 0;
		position: absolute;
		transform: rotateX(0);
	}

	.count-exit-active {
		transform: scale(4) rotateX(0.5turn);
	}
`;
