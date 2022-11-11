import styled from 'styled-components';

const StyledUnorderedList = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	grid-gap: 4rem;
	padding-left: 0;
`;

export default StyledUnorderedList;
