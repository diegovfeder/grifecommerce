import { ReactNode } from 'react';
import { Container } from './styles';

interface MyCartPageProps {
	children: ReactNode;
}

const MyCartPage = ({ children }: MyCartPageProps) => {
	return (
		<Container>
			<h1>My Cart</h1>
			{children}
		</Container>
	);
};

export default MyCartPage;
