import { graphql } from "@keystone-6/core";
import { ICartItemModel } from "../types/models";

export const extendGraphqlSchema = graphql.extend((base) => {
	return {
		// query: {}
		mutation: {
			addToCart: graphql.field({
				type: base.object("CartItem"),
				args: {
					productId: graphql.arg({ type: graphql.nonNull(graphql.ID) }),
				},
				async resolve(_source, { productId }, context) {
					const session = context.session;
					if (!session.itemId) {
						throw new Error(
							"You must be logged in to add a product to your cart"
						);
					}

					const allCartItems = await context.db.CartItem.findMany({
						where: {
							user: {
								id: { equals: session.itemId },
							},
							product: {
								id: { equals: productId },
							},
						},
					});

					const [existingCartItem] = <ICartItemModel[]>(<unknown>allCartItems);
					if (existingCartItem) {
						return await context.prisma.cartItem.update({
							where: {
								id: existingCartItem.id,
							},
							data: {
								quantity: existingCartItem.quantity + 1,
							},
						});
					}

					return await context.prisma.cartItem.create({
						data: {
							product: { connect: { id: productId } },
							user: { connect: { id: session.itemId } },
						},
					});
				},
			}),
			checkout: graphql.field({
				type: base.object("Order"),
				args: {
					token: graphql.arg({ type: graphql.nonNull(graphql.String) }),
				},
				async resolve(_source, { token }, context) {
					const session = context.session;
					if (!session.itemId) {
						throw new Error(
							"You must be signed in to create an order and checkout!"
						);
					}

					const user = await context.db.User.findOne({
						where: { id: session.itemId },
					});
					console.log({ user });

					// TODO: Use prisma or graphql api instead of db to get proper nested object values and not only productId
					const allCartItems = await context.prisma.cartItem.findMany({
						where: {
							user: {
								id: session.itemId,
								// id: { equals: session.itemId },
							},
						},
					});
					console.log(allCartItems);

					const cartItems = allCartItems.filter(
						(cartItem) => cartItem.productId
					);
					console.log(cartItems);

					// const amount = cartItems.reduce((tally: number, cartItem: ICartItemModel) => {
					// 	return tally + cartItem.quantity * cartItem.product.price;
					// }

					// const [existingCartItem] = <ICartItem[]>(<unknown>allCartItems);
					// if (!existingCartItem) {
					// 	throw new Error("You have no items in your cart");
					// }

					// const order = await context.prisma.order.create({
					// 	data: {
					// 		user: { connect: { id: session.itemId } },
					// 		items: {
					// 			create: allCartItems.map((cartItem) => {
					// 				return {
					// 					product: { connect: { id: cartItem.productId } },
					// 					quantity: cartItem.quantity,
					// 				};
					// 			}),
					// 		},
					// 	},
					// });

					// await context.prisma.cartItem.deleteMany({
					// 	where: {
					// 		user: {
					// 			id: { equals: session.itemId },
					// 		},
					// 	},
					// });
				},
			}),
		},
	};
});
