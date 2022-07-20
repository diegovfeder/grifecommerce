import { render, screen } from '@testing-library/react';
import CartCount from '../components/CartCount';

describe('<CartCount/>', () => {
	it('renders component with proper count', () => {
		render(<CartCount count={10} />);
		expect(screen.getByText('10')).toBeInTheDocument();
	});
});
