import { relationship, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';

import { permissions } from '../access';
import { permissionFields } from '../fields/RoleFields';

export const Role = list({
	access: {
		operation: {
			query: permissions.canManageRoles,
			create: permissions.canManageRoles,
			update: permissions.canManageRoles,
			delete: permissions.canManageRoles,
		},
	},
	ui: {
		isHidden: ({ session }) => !permissions.canManageRoles({ session }),
		hideCreate: ({ session }) => !permissions.canManageRoles({ session }),
		hideDelete: ({ session }) => !permissions.canManageRoles({ session }),
	},
	fields: {
		name: text({ validation: { isRequired: true } }),
		...permissionFields,
		assignedTo: relationship({
			ref: 'User.role',
			many: true,
			ui: {
				itemView: { fieldMode: 'read' },
			},
		}),
	},
});
