import { integer, relationship, text, virtual } from '@keystone-6/core/fields';
import { list, graphql } from '@keystone-6/core';
import formatMoney from '../utils/formatMoney';
import { isSignedIn, permissions } from '../access';

// TODO: Finish Orders model in keystone
// TODO: Test Orders model in keystone
export const Order = list({
	access: {
		operation: {
			create: isSignedIn,
			query: permissions.canManageOrders,
			update: () => false,
			delete: () => false,
		},
	},
	fields: {
		label: virtual({
			// FIXME: virtual field type
			field: graphql.field({
				type: graphql.String,
				resolve(item: { total: number }) {
					return `${formatMoney(item.total)}`;
				},
			}),
		}),
		total: integer(),
		items: relationship({
			ref: 'OrderItem.order',
			many: true,
		}),
		user: relationship({
			ref: 'User.orders',
		}),
		charge: text(),
	},
});
