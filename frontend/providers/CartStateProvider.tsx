import React, {
	createContext,
	useState,
	Dispatch,
	SetStateAction,
} from 'react';

interface LocalCartStateProps {
	cartOpen: boolean;
	setCartOpen: Dispatch<SetStateAction<boolean>>;
	closeCart: () => void;
	openCart: () => void;
	toggleCart: () => void;
}

export const LocalCartStateContext = createContext<LocalCartStateProps>({
	cartOpen: false,
	setCartOpen: () => {},
	closeCart: () => {},
	openCart: () => {},
	toggleCart: () => {},
});
const LocalCartStateProvider = LocalCartStateContext.Provider;

const CartStateProvider = ({ children }: { children: React.ReactNode }) => {
	const [cartOpen, setCartOpen] = useState(false);

	const closeCart = () => {
		setCartOpen(false);
	};

	const openCart = () => {
		setCartOpen(true);
	};

	const toggleCart = () => {
		setCartOpen(!cartOpen);
	};

	return (
		<LocalCartStateProvider
			value={{ cartOpen, setCartOpen, closeCart, openCart, toggleCart }}
		>
			{children}
		</LocalCartStateProvider>
	);
};

export default CartStateProvider;
