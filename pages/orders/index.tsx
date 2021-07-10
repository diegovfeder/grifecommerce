import { ReactNode } from 'react';
import Head from 'next/head';

interface IOrdersPage {
	children: ReactNode;
}

const OrdersPage = ({ children }: IOrdersPage) => {
	return (
		<>
			<Head>
				<title>GRIFE | Orders</title>
			</Head>
			<h1>Orders</h1>
			{children}
		</>
	);
};

export default OrdersPage;
