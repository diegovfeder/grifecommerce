import {
	ReactNode,
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
	cartStyles: {
		opacity: number;
		pointerEvents: string;
	};
}

export const LocalCartStateContext = createContext<LocalCartStateProps>({
	cartOpen: false,
	setCartOpen: () => {},
	closeCart: () => {},
	openCart: () => {},
	toggleCart: () => {},
	cartStyles: {
		opacity: 0,
		pointerEvents: 'none',
	},
});
const LocalCartStateProvider = LocalCartStateContext.Provider;

const CartStateProvider = ({ children }: { children: ReactNode }) => {
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

	const cartStyles = {
		opacity: cartOpen ? 1 : 0,
		pointerEvents: cartOpen ? 'all' : 'none',
	};

	return (
		<LocalCartStateProvider
			value={{
				cartOpen,
				setCartOpen,
				closeCart,
				openCart,
				toggleCart,
				cartStyles,
			}}
		>
			{children}
		</LocalCartStateProvider>
	);
};

export default CartStateProvider;
