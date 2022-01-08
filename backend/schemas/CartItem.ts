import { integer, relationship, select, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';

export const CartItem = list({
	// TODO access:
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
