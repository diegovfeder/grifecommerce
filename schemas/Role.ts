import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { permissionFields } from './Fields';

export const Role = list({
	fields: {
		name: text({ isRequired: true }),
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
