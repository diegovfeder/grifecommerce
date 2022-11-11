import { integer, relationship, select, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';

import { isSignedIn, rules } from '../access';

// FIXME: access control / operation
export const Product = list({
	access: {
		operation: {
			create: isSignedIn,
			query: isSignedIn,
			// query: rules.canReadProducts,
			update: isSignedIn,
			// update: () => rules.canManageProducts,
			delete: isSignedIn,
			// delete: () => rules.canManageProducts,
		},
	},
	fields: {
		name: text({ validation: { isRequired: true } }),
		description: text({
			ui: {
				displayMode: 'textarea',
			},
		}),
		photo: relationship({
			ref: 'ProductImage.product',
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
		status: select({
			options: [
				{ label: 'Draft', value: 'DRAFT' },
				{ label: 'Available', value: 'AVAILABLE' },
				{ label: 'Unavailable', value: 'UNAVAILABLE' },
			],
			defaultValue: 'DRAFT',
			ui: {
				displayMode: 'segmented-control',
				createView: { fieldMode: 'hidden' },
			},
		}),
		price: integer(),
		// FIXME: defaultValue to relationship
		user: relationship({
			ref: 'User.products',
			// defaultValue: ({ context }) => ({
			// 	connect: { id: context.session.itemId },
			// }),
			hooks: {
				resolveInput: async ({
					listKey,
					fieldKey,
					operation,
					inputData,
					item,
					resolvedData,
					context,
				}) => {
					console.log('hooks/resolveInput: ', {
						listKey,
						fieldKey,
						operation,
						inputData,
						item,
						resolvedData,
						context,
					});
					return resolvedData['user'];
				},
			},
		}),
	},
});
