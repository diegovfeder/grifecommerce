import { list } from '@keystone-6/core';
import { text, password, relationship } from '@keystone-6/core/fields';
import { cloudinaryImage } from '@keystone-6/cloudinary';

import { permissions } from '../access';
import { cloudinary } from '../utils/cloudinary';

export const User = list({
	access: {
		operation: {
			// FIXME: A user should only be able to create other users if isAdmin is true
			create: () => true,
			// FIXME: A user should only be able to query other users if isAdmin is true
			query: () => true,
			// FIXME: A user should only be able to update their own user record
			update: permissions.canManageUsers,
			delete: permissions.canManageUsers,
		},
	},
	ui: {
		hideCreate: ({ session }) => !permissions.canManageUsers({ session }),
		hideDelete: ({ session }) => !permissions.canManageUsers({ session }),
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
		fullName: text({}),
		phone: text({}),
		photo: cloudinaryImage({
			cloudinary,
			label: 'Source',
		}),
		altText: text({}),
		zipCode: text({}),
		address: text({}),
		houseNumber: text({}),
		addOn: text({}),
		city: text({}),
		neighbourhood: text({}),
		state: text({}),
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
