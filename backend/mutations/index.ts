import { graphql } from "@keystone-6/core";
import { ICartItemModel, IProductModel } from "../types/models";
import stripeConfig from "../utils/stripe";

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
					const userId = context.session.itemId;
					if (!userId) {
						throw new Error(
							"You must be signed in to create an order and checkout!"
						);
					}

					const user = await context.db.User.findOne({
						where: { id: userId },
					});

					const allCartItems = await context.prisma.cartItem.findMany({
						where: {
							user: {
								id: userId,
							},
						},
					});

					const cartItems = allCartItems.filter((cartItem) => {
						return cartItem.productId;
					});
					console.log({ cartItems });

					if (!cartItems) {
						throw new Error("You have no items in your cart");
					}

					const findProducts = async () => {
						const unresolvedPromises = cartItems.map((cartItem) =>
							context.prisma.product.findUnique({
								where: {
									id: cartItem.productId,
								},
							})
						);
						return await Promise.all(unresolvedPromises);
					};

					const products = await findProducts();
					console.log({ products });

					const amount = products.reduce(
						(tally: number, product: IProductModel, index: number) =>
							tally + product.price * cartItems[index].quantity,
						0
					);
					// console.log({ amount });

					const charge = await stripeConfig.paymentIntents
						.create({
							amount,
							currency: "BRL",
							confirm: true,
							payment_method: token,
						})
						.catch((err) => {
							console.log(err);
							throw new Error(err.message);
						});
					console.log(charge);

					// TODO: Test this, update to new API
					const orderItems = cartItems.map((cartItem, index) => {
						const orderItem = {
							name: products[index].name,
							description: products[index].description,
							price: products[index].price,
							quantity: cartItem.quantity,
							image: { connect: { id: products[index].photoId } },
							user: { connect: { id: userId } },
						};
						return orderItem;
					});
					console.log({ orderItems });

					const order = await context.prisma.order.create({
						data: {
							total: charge.amount,
							charge: charge.id,
							items: { create: orderItems },
							user: { connect: { id: userId } },
						},
					});

					const cartItemIds = cartItems.map((cartItem) => cartItem.id);
					await context.prisma.cartItem.deleteMany({
						ids: cartItemIds,
					});

					return order;
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
