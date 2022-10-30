import styled from 'styled-components';

const StyledForm = styled.form`
	box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
	background: rgba(0, 0, 0, 0.02);
	border: 5px solid white;
	padding: 20px 20px 30px;
	font-size: 1.5rem;
	line-height: 1.5;
	font-weight: 600;

	label {
		display: block;
		margin-bottom: 1rem;
	}

	input,
	textarea,
	select {
		width: 100%;
		padding: 0.5rem;
		font-size: 1rem;
		border: 1px solid black;

		&:focus {
			outline: 0;
			border-color: var(--red);
		}
	}

	input,
	textarea {
		margin-top: 4px;
		border-radius: 4px;
		font-size: 1.8rem;
		padding: 0.75rem;
		font-family: 'Montserrat', sans-serif;
	}

	textarea {
		height: 150px;
	}

	button,
	input[type='submit'] {
		cursor: pointer;
		white-space: nowrap;
		width: auto;
		background: red;
		color: white;
		border: 0;
		font-size: 2rem;
		font-weight: 600;
		padding: 0.5rem 1.2rem;
		margin-top: 1rem;

		&:hover,
		&:focus {
			text-decoration: underline;
		}
	}

	h2,
	h3 {
		margin-top: 0rem;
		margin-bottom: 1rem;
	}

	fieldset {
		border: 0;
		padding: 0;

		&[disabled] {
			opacity: 0.5;
		}

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

		&[aria-busy='true']::before {
			background-size: 50% auto;
		}
	}
`;

export default StyledForm;
