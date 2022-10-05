import { list } from '@keystone-6/core';
import { integer, relationship, text } from '@keystone-6/core/fields';

import { isSignedIn, permissions } from '../access';

export const OrderItem = list({
	access: {
		operation: {
			create: isSignedIn,
			query: permissions.canManageOrderItems,
			update: () => false,
			delete: () => false,
		},
	},
	fields: {
		name: text({ validation: { isRequired: true } }),
		description: text({
			ui: {
				displayMode: 'textarea',
			},
		}),
		price: integer(),
		quantity: integer(),
		order: relationship({
			ref: 'Order.items',
		}),
		photo: relationship({
			ref: 'ProductImage',
			ui: {
				displayMode: 'cards',
				cardFields: ['image', 'altText'],
				inlineCreate: {
					fields: ['image', 'altText'],
				},
				inlineEdit: {
					fields: ['image', 'altText'],
				},
			},
		}),
	},
});
