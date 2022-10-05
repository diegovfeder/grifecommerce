import { list } from '@keystone-6/core';
import { text, password, relationship } from '@keystone-6/core/fields';

import { permissions } from '../access';

export const User = list({
	access: {
		operation: {
			create: () => true,
			query: () => true,
			update: permissions.canManageUsers,
			delete: permissions.canManageUsers,
		},
	},
	ui: {
		hideCreate: args => !permissions.canManageUsers(args),
		hideDelete: args => !permissions.canManageUsers(args),
	},
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
		orders: relationship({ ref: 'Order.user', many: true }),
		role: relationship({
			ref: 'Role.assignedTo',
			access: {
				create: permissions.canManageUsers,
				update: permissions.canManageUsers,
			},
		}),
		products: relationship({
			ref: 'Product.user',
			many: true,
		}),
	},
});
