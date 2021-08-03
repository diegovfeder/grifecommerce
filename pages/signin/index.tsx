import { ReactNode } from 'react';
import Head from 'next/head';
import SignIn from 'components/SignIn';
import SignUp from 'components/SignUp';
import styled from 'styled-components';
import RequestReset from 'components/RequestReset';

interface ISignInPage {
	children: ReactNode;
}

const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	grid-gap: 2rem;
`;

const SignInPage = ({ children }: ISignInPage) => {
	return (
		<>
			<Head>
				<title>GRIFE | Sign In</title>
			</Head>
			<h1>Sign In / Sign Up</h1>
			{children}
			<StyledGrid>
				<SignIn />
				<SignUp />
				<RequestReset />
			</StyledGrid>
		</>
	);
};

export default SignInPage;
