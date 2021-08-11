import { KeystoneContext } from '@keystone-next/types';

async function addToCart(
	root: any,
	{ productId }: { productId: string },
	context: KeystoneContext,
): Promise<any> {
	console.log('adding to cart');

	// 1. Query the user, see if is signed in.
	const session = context.session;
	if (!session.itemId) {
		throw new Error('You must be logged in to do this!');
	}

	// 2. Query the current users cart
	const allCartItems = await context.lists.CartItem.findMany({
		where: {
			user: {
				id: session.itemId,
			},
			product: {
				id: productId,
			},
		},
		resolveFields: 'id,quantity',
	});

	// 3. See if the current item is in their cart
	// -- 3.a. If it is, inc by 1
	const [existingCartItem] = allCartItems;
	if (existingCartItem) {
		console.log(existingCartItem);
		console.log(
			`There are already ${existingCartItem.quantity}, increment by 1!`,
		);

		return await context.lists.CartItem.updateOne({
			id: existingCartItem.id,
			data: { quantity: existingCartItem.quantity + 1 },
			resolveFields: false,
		});
	}
	// -- 3.b. If it isn't, create new cartItem
	return await context.lists.CartItem.createOne({
		data: {
			product: { connect: { id: productId } },
			user: { connect: { id: session.itemId } },
		},
		resolveFields: false,
	});
}

export default addToCart;
