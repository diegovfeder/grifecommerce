import styled, { keyframes } from 'styled-components';

interface StyledDropDownItemProps {
	highlighted: boolean;
}

const StyledDropDown = styled.div`
	position: absolute;
	width: 100%;
	z-index: 2;
	border: 1px solid var(--lightGrey);
`;

const StyledDropDownItem = styled.div<StyledDropDownItemProps>`
	border-bottom: 1px solid var(--lightGrey);
	background: ${props => (props.highlighted ? '#f7f7f7' : 'white')};
	padding: 1rem;
	transition: all 0.2s;
	${props => (props.highlighted ? 'padding-left: 2rem;' : null)};
	display: flex;
	align-items: center;
	border-left: 10px solid
		${props => (props.highlighted ? props.theme.lightgrey : 'white')};
	cursor: pointer;

	img {
		margin-right: 10px;
	}
`;

const glow = keyframes`
  from {
    box-shadow: 0 0 1px white;
  }

  to {
    box-shadow: 0 0 4px 1px var(--black);
  }
`;

const StyledSearch = styled.div`
	position: relative;

	input {
		width: 100%;
		padding: 10px;
		border: 0;
		font-size: 2rem;

		&.loading {
			animation: ${glow} 2s ease-in-out infinite alternate;
		}
	}
`;

export { StyledDropDown, StyledDropDownItem, StyledSearch };
