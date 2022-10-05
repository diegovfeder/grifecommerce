import { ListAccessArgs } from './types/wesbosTypes';

export function isSignedIn({ session }: ListAccessArgs) {
	return !!session;
}

export const permissions = {
	canManageProducts: ({ session }: ListAccessArgs) =>
		!!session?.data.role?.canManageProducts,
	canSeeOtherUsers: ({ session }: ListAccessArgs) =>
		!!session?.data.role?.canSeeOtherUsers,
	canManageUsers: ({ session }: ListAccessArgs) =>
		!!session?.data.role?.canManageUsers,
	canManageRoles: ({ session }: ListAccessArgs) =>
		!!session?.data.role?.canManageRoles,
	canManageCart: ({ session }: ListAccessArgs) =>
		!!session?.data.role?.canManageCart,
	canManageOrders: ({ session }: ListAccessArgs) =>
		!!session?.data.role?.canManageOrders,
	canManageOrderItems: ({ session }: ListAccessArgs) =>
		!!session?.data.role?.canManageOrderItems,
};

export const rules = {
	canManageProducts({ session }: ListAccessArgs) {
		if (!isSignedIn({ session })) {
			return false;
		}
		if (permissions.canManageProducts({ session })) {
			return true;
		}
		// If else, only allow if they own the item?
		return { user: { id: session.itemId } };
	},
	// canSeeOtherUsers
	canManageUsers({ session }: ListAccessArgs) {
		if (!isSignedIn({ session })) {
			return false;
		}
		if (permissions.canManageUsers({ session })) {
			return true;
		}
		// Otherwise they may only update themselves!
		return { id: session.itemId };
	},
	// canManageRoles
	canOrder({ session }: ListAccessArgs) {
		if (!isSignedIn({ session })) {
			return false;
		}
		if (permissions.canManageCart({ session })) {
			return true;
		}
		return { user: { id: session.itemId } };
	},
	canManageOrderItems({ session }: ListAccessArgs) {
		if (!isSignedIn({ session })) {
			return false;
		}
		if (permissions.canManageCart({ session })) {
			return true;
		}
		return { order: { user: { id: session.itemId } } };
	},
	canReadProducts({ session }: ListAccessArgs) {
		if (!isSignedIn({ session })) {
			return false;
		}
		if (permissions.canManageProducts({ session })) {
			return true;
		}
		// They should only see available products (based on the status field)
		return { status: 'AVAILABLE' };
	},
};
