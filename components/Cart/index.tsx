import { useState } from 'react';
import StyledCart from 'components/styled/StyledCart';
import Supreme from 'components/styled/Supreme';
import { useUser } from 'components/UserComponent';
import styled from 'styled-components';
import { IUserModel, IProductModel } from 'types/commonTypes';
import Image from 'next/image';
import formatMoney from 'util/formatMoney';
import calcTotalPrice from 'util/calcTotalPrice';
import { useLocalState } from 'hooks/cartState';
import StyledCloseButton from 'components/styled/StyledCloseButton';

interface ICartItem {
	id: string;
	quantity: number;
	product: IProductModel;
	user: IUserModel;
}

const StyledCartItem = styled.li`
	padding: 1rem 0;
	border-bottom: 1px solid var(--lightGray);
	display: grid;
	grid-template-columns: auto 1fr auto;

	h3,
	p {
		padding-left: 1rem;
	}
`;

const CartItem = ({ id, quantity, product, user }: ICartItem) => {
	return (
		<StyledCartItem>
			<Image
				src={product?.photo?.image?.publicUrlTransformed}
				alt={product?.name}
				width={100}
				height={100}
			/>
			<div>
				<h3>{product.name}</h3>
				<p>
					{formatMoney(product?.price * quantity)}-
					<em>
						{quantity} &times; {formatMoney(product?.price)} each
					</em>
				</p>
			</div>
		</StyledCartItem>
	);
};

const Cart = () => {
	const user = useUser();
	// TODO: Refactor useLocalContext
	const { cartOpen, closeCart } = useLocalState();

	return (
		<>
			<StyledCart open={cartOpen}>
				<header>
					<Supreme>{user?.name}'s Cart</Supreme>
					<StyledCloseButton onClick={closeCart}>&times;</StyledCloseButton>
				</header>
				<ul>
					{user?.cart?.map((cartItem: ICartItem) => (
						<CartItem
							key={cartItem?.id}
							id={cartItem.id}
							quantity={cartItem.quantity}
							product={cartItem.product}
							user={cartItem.user}
						/>
					))}
				</ul>
				<footer>
					<p>{formatMoney(calcTotalPrice(user?.cart))}</p>
				</footer>
			</StyledCart>
		</>
	);
};

export default Cart;
