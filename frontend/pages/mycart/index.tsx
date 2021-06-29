import { ReactNode } from 'react';
interface MyCartPageProps {
	children: ReactNode;
}

const MyCartPage = ({ children }: MyCartPageProps) => {
	return (
		<>
			<h1>My Cart</h1>
			{children}
		</>
	);
};

export default MyCartPage;
