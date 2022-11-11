import styled from 'styled-components';

const StyledNavigationButton = styled.button<{ focused: boolean }>`
	${props => !props.focused && `pointer-events: none;`}
`;

export default StyledNavigationButton;
