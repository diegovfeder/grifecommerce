import styled from 'styled-components';

const StyledCard = styled.form`
	box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
	background: rgba(0, 0, 0, 0.02);
	border: 5px solid white;
	padding: 20px;
	font-size: 1.5rem;
	line-height: 1.5;
	font-weight: 600;

	p,
	h2 {
		border: 0;
		padding: 0;
		margin: 0;
		margin-bottom: 1rem;

		&[disabled] {
			opacity: 0.5;
		}
	}

	h2,
	h3 {
		margin-top: 2rem;
		margin-bottom: 1rem;

		&:first-child {
			margin-top: 0rem;
		}
	}

	ul {
		margin-top: 0rem;
		margin-bottom: 1rem;

		&:before {
			height: 10px;
			content: '';
			display: block;
			margin-top: 0px;
			padding: 0;
			margin-bottom: 20px;
			background-image: linear-gradient(
				to right,
				var(--primary) 0%,
				var(--darkGrey) 50%,
				var(--primary) 100%
			);
		}
	}
`;

export default StyledCard;
