import styled from 'styled-components';

const StyledItem = styled.div`
	background: white;
	box-shadow: var(--bs);
	position: relative;
	display: flex;
	flex-direction: column;
	border: 0.2rem solid var(--black);
	border-radius: 5px;

	img {
		width: 100%;
		height: 400px;
		object-fit: cover;
	}

	p {
		line-height: 2;
		font-weight: 300;
		flex-grow: 1;
		font-size: 1.5rem;
		margin: 0 0 2rem 0;
	}

	.buttonList {
		display: grid;
		width: 100%;
		border-top: 1px solid var(--lightGrey);
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		grid-gap: 1px;
		background: var(--lightGrey);
		border-radius: 5px;
		border-top: 0.2rem solid var(--darkGray);

		& > * {
			background: white;
			border: 0;
			padding: 1rem;
			cursor: pointer;
		}
	}
`;

export default StyledItem;
