import { graphql } from "@keystone-6/core";

// TODO: Create checkout mutation using keystone-6 api
const checkout = graphql.extend((base) => {
	return {
		mutation: {
			checkout: graphql.field({
				type: base.object("Order"),
				args: {
					productId: graphql.arg({ type: graphql.nonNull(graphql.ID) }),
					quantity: graphql.arg({
						type: graphql.nonNull(graphql.Int),
						defaultValue: 1,
					}),
				},
				resolve(_source, { productId, quantity }, context) {
					return context.db.Order.updateOne({
						where: { productId },
						data: { quantity: quantity },
					});
				},
			}),
		},
	};
});

export default checkout;
