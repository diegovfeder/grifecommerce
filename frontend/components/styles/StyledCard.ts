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

	ul {
		&:before {
			height: 10px;
			content: '';
			display: block;
			margin-bottom: 20px;
			background-image: linear-gradient(
				to right,
				#ff3019 0%,
				#e2b04a 50%,
				#ff3019 100%
			);
		}
	}
`;

export default StyledCard;
