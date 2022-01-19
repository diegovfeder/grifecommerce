import { graphql } from "@keystone-6/core";

interface ICartItem {
	id: string;
	quantity: number;
	productId: string;
	userId: string;
}

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

					const [existingCartItem] = <ICartItem[]>(<unknown>allCartItems);
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
			// checkout: graphql.field({...})
		},
	};
});
