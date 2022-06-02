import { render, screen } from '@testing-library/react';
import wait from 'waait';
import CartCount from '../components/CartCount';

describe('<CartCount/>', () => {
	it('Renders', () => {
		render(<CartCount count={10} />);
		expect(screen.getByText('10')).toBeInTheDocument();
	});
});
