import { integer, relationship, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';

export const OrderItem = list({
	fields: {
		name: text({ validation: { isRequired: true } }),
		description: text({
			ui: {
				displayMode: 'textarea',
			},
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
		price: integer(),
		quantity: integer(),
		order: relationship({
			ref: 'Order.items',
		}),
	},
});
