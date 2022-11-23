import { list } from '@keystone-6/core';
import { integer, relationship } from '@keystone-6/core/fields';

import { permissions, isSignedIn } from '../access';

export const CartItem = list({
	access: {
		operation: {
			query: permissions.canOrder,
			create: isSignedIn,
			update: permissions.canOrder,
			delete: permissions.canOrder,
		},
	},
	ui: {
		listView: {
			initialColumns: ['product', 'quantity', 'user'],
		},
	},
	fields: {
		// TODO custom label in here:
		quantity: integer({
			defaultValue: 1,
			validation: {
				isRequired: true,
			},
		}),
		product: relationship({ ref: 'Product' }),
		user: relationship({ ref: 'User.cart' }),
	},
});
