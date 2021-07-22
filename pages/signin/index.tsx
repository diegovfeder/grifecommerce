import { ReactNode } from 'react';
import Head from 'next/head';

interface ISignInPage {
	children: ReactNode;
}

const SignInPage = ({ children }: ISignInPage) => {
	return (
		<>
			<Head>
				<title>GRIFE | Sign In</title>
			</Head>
			<h1>Sign In</h1>
			{children}
		</>
	);
};

export default SignInPage;
