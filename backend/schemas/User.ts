import { list } from '@keystone-6/core';
import { text, password, relationship } from '@keystone-6/core/fields';

export const User = list({
	// access:
	// ui:
	fields: {
		name: text({
			validation: {
				isRequired: true,
			},
		}),
		email: text({
			validation: {
				isRequired: true,
			},
			isIndexed: 'unique',
		}),
		password: password(),
		cart: relationship({
			ref: 'CartItem.user',
			many: true,
			ui: {
				createView: { fieldMode: 'hidden' },
				itemView: { fieldMode: 'read' },
			},
		}),
		// TODO: add roles, cart and orders
		// orders
		role: relationship({
			ref: 'Role.assignedTo',
			// TODO: Add access control
		}),
	},
});
