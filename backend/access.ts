import {
	isSignedIn,
	canManageCart,
	canManageOrderItems,
	canManageOrders,
	canManageProducts,
	canManageRoles,
	canManageUsers,
	canOrder,
	canReadProducts,
} from './permissions';

const permissions = {
	canManageCart,
	canManageOrderItems,
	canManageOrders,
	canManageProducts,
	canManageRoles,
	canManageUsers,
	canOrder,
	canReadProducts,
};

export { isSignedIn, permissions };
