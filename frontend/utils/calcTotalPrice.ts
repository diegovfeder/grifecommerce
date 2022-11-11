import { CartItemProps } from '../@types/commonTypes';

export default function calcTotalPrice(cart: CartItemProps[]) {
	return cart.reduce((tally, cartItem) => {
		if (!cartItem.product) return tally;
		return tally + cartItem.quantity * cartItem.product.price;
	}, 0);
}
