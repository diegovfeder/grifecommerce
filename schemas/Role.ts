import { relationship, text } from '@keystone-6/core/fields';
import { list } from '@keystone-6/core';
import { permissionFields } from './Fields';

export const Role = list({
	fields: {
		name: text(), // isRequired
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
