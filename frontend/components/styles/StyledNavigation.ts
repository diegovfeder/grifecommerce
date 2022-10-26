import styled from 'styled-components';

const StyledNavigation = styled.ul`
	margin: 0;
	padding: 0;
	display: flex;
	justify-self: end;
	font-size: 2rem;

	a,
	button {
		white-space: nowrap;
		padding: 1rem 3rem;
		display: flex;
		align-items: center;
		position: relative;
		text-transform: uppercase;
		font-weight: 900;
		font-size: 2em;
		background: none;
		border: 0;
		cursor: pointer;

		@media (max-width: 15000px) {
			font-size: 1em;
			padding: 0.5rem 1.5rem;
		}

		@media (max-width: 1000px) {
			font-size: 0.8em;
			padding: 0.5rem 1.5rem;
		}

		@media (max-width: 768px) {
			font-size: 0.6em;
			padding: 0.5rem 1.5rem;
		}

		&:before {
			content: '';
			width: 2px;
			background: var(--lightGrey);
			height: 100%;
			left: 0;
			position: absolute;
			transform: skew(-20deg);
			top: 0;
			bottom: 0;
		}

		&:after {
			height: 2px;
			background: red;
			content: '';
			width: 0;
			position: absolute;
			transform: translateX(-50%);
			transition: width 0.4s;
			transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
			left: 50%;
			margin-top: 2rem;
		}

		&:hover,
		&:focus {
			outline: none;
			&:after {
				width: calc(100% - 60px);
			}
		}
	}

	@media (max-width: 1300px) {
		border-top: 1px solid var(--lightGrey);
		justify-content: center;
		font-size: 1.5rem;
	}
`;

export default StyledNavigation;
