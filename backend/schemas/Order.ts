import { integer, relationship, text, virtual } from "@keystone-6/core/fields";
import { list, graphql } from "@keystone-6/core";
import formatMoney from "../utils/formatMoney";

export const Order = list({
	fields: {
		label: virtual({
			field: graphql.field({
				type: graphql.String,
				resolve(item) {
					return `${formatMoney(item.total)}`;
				},
			}),
		}),
		total: integer(),
		items: relationship({
			ref: "OrderItem.order",
			many: true,
		}),
		user: relationship({
			ref: "User.orders",
		}),
		charge: text(),
	},
});
