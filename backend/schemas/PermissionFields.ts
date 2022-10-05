import { checkbox } from '@keystone-6/core/fields';

type PermisstionFieldsTypes =
	| 'canManageCart'
	| 'canManageOrderItems'
	| 'canManageOrders'
	| 'canManageProducts'
	| 'canManageRoles'
	| 'canManageUsers'
	| 'canSeeOtherUsers';

export const permissionFields = {
	canManageCart: checkbox({
		defaultValue: false,
		label: 'User can see and manage cart and cart items',
	}),
	canManageOrderItems: checkbox({
		defaultValue: false,
		label: 'User can see and manage order items',
	}),
	canManageOrders: checkbox({
		defaultValue: false,
		label: 'User can see and manage orders',
	}),
	canManageProducts: checkbox({
		defaultValue: false,
		label: 'User can Update and delete any product',
	}),
	canManageRoles: checkbox({
		defaultValue: false,
		label: 'User can CRUD roles',
	}),
	canManageUsers: checkbox({
		defaultValue: false,
		label: 'User can Edit other users',
	}),
	canSeeOtherUsers: checkbox({
		defaultValue: false,
		label: 'User can query other users',
	}),
};

export type IPermissionFields = keyof typeof permissionFields;

export const permissionsList: PermisstionFieldsTypes[] = Object.keys(
	permissionFields,
) as IPermissionFields[];
