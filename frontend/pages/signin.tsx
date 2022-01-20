import Head from 'next/head';
import styled from 'styled-components';
import RequestPasswordReset from '../components/RequestPasswordReset';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-gap: 2rem;
`;

const SignInPage = () => {
	return (
		<>
			<Head>
				<title>GRIFE | Sign In</title>
			</Head>
			<StyledGrid>
				<SignIn />
				<SignUp />
				<RequestPasswordReset />
			</StyledGrid>
		</>
	);
};

export default SignInPage;
