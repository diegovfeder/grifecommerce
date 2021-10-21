import { ReactNode } from 'react';
import Head from 'next/head';

interface IMyCartPage {
	children: ReactNode;
}

const MyCartPage = ({ children }: IMyCartPage) => {
	return (
		<>
			<Head>
				{/* <script async src="https://cdn.splitbee.io/sb.js"></script> */}{' '}
				<title>GRIFE | My Cart</title>
			</Head>
			<h1>My Cart</h1>
			{children}
		</>
	);
};

export default MyCartPage;
