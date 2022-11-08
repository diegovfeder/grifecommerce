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
		label: 'User can CRUD cart and carttems',
	}),
	canManageOrderItems: checkbox({
		defaultValue: false,
		label: 'User can CRUD orderItems',
	}),
	canManageOrders: checkbox({
		defaultValue: false,
		label: 'User can CRUD orders',
	}),
	canManageProducts: checkbox({
		defaultValue: false,
		label: 'User can CRUD products',
	}),
	canManageRoles: checkbox({
		defaultValue: false,
		label: 'User can CRUD roles',
	}),
	canManageUsers: checkbox({
		defaultValue: false,
		label: 'User can CRUD users',
	}),
};

export type IPermissionFields = keyof typeof permissionFields;

export const permissionsList: PermisstionFieldsTypes[] = Object.keys(
	permissionFields,
) as IPermissionFields[];
