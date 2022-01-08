import { ReactNode } from 'react';
import Head from 'next/head';
import SignIn from 'components/forms/SignIn';
import SignUp from 'components/forms/SignUp';
import styled from 'styled-components';
import RequestReset from 'components/forms/RequestPasswordReset';

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
			<StyledGrid>
				<SignIn />
				<SignUp />
				<RequestReset />
			</StyledGrid>
			{children}
		</>
	);
};

export default SignInPage;
