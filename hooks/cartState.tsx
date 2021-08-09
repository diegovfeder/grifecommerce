import { createContext, useContext, useState } from 'react';

// TODO: Refactor this file to be a localState provider
// TODO: pass defautlValue to createContext
const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

const CartStateProvider = ({ children }: any) => {
	// This is our only custom provider! We will store data(state) and functionality (updates)
	// in here and anyone can access it via the consumer

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
		<LocalStateProvider
			value={{ cartOpen, setCartOpen, closeCart, openCart, toggleCart }}
		>
			{children}
		</LocalStateProvider>
	);
};

// make a custom hook for accessing the cart local state
const useLocalState = () => {
	// we use a consumer here to access the local state
	const all = useContext(LocalStateContext);
	return all;
};

export { CartStateProvider, useLocalState };
