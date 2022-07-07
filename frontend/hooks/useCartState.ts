import { useContext } from 'react';
import { LocalCartStateContext } from '../providers/CartStateProvider';

const useCartState = () => {
	const cartState = useContext(LocalCartStateContext);
	return cartState;
};

export default useCartState;
