import { ListAccessArgs } from './@types/keystone';

export function isSignedIn({ session }: ListAccessArgs) {
	return !!session;
}

export const permissions = {
	canManageCart: ({ session }: ListAccessArgs) =>
		!!session?.data.role?.canManageCart,
	canManageOrderItems: ({ session }: ListAccessArgs) =>
		!!session?.data.role?.canManageOrderItems,
	canManageOrders: ({ session }: ListAccessArgs) =>
		!!session?.data.role?.canManageOrders,
	canManageProducts: ({ session }: ListAccessArgs) =>
		!!session?.data.role?.canManageProducts,
	canManageRoles: ({ session }: ListAccessArgs) =>
		!!session?.data.role?.canManageRoles,
	canManageUsers: ({ session }: ListAccessArgs) =>
		!!session?.data.role?.canManageUsers,
};

export const rules = {
	canManageCart({ session }: ListAccessArgs) {
		if (!isSignedIn({ session })) {
			return false;
		}
		return true;
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
	canManageOrders({ session }: ListAccessArgs) {
		if (!isSignedIn({ session })) {
			return false;
		}
		return true;
	},
	canManageProducts({ session }: ListAccessArgs) {
		if (!isSignedIn({ session })) {
			return false;
		}
		if (permissions.canManageProducts({ session })) {
			return true;
		}
		return { user: { id: session.itemId } };
	},
	canManageRoles({ session }: ListAccessArgs) {
		if (!isSignedIn({ session })) {
			return false;
		}
		if (permissions.canManageRoles({ session })) {
			return true;
		}
		return { user: { id: session.itemId } };
	},
	canManageUsers({ session }: ListAccessArgs) {
		if (!isSignedIn({ session })) {
			return false;
		}
		if (permissions.canManageUsers({ session })) {
			return true;
		}
		return { id: session.itemId };
	},
	canOrder({ session }: ListAccessArgs) {
		if (!isSignedIn({ session })) {
			return false;
		}
		if (permissions.canManageCart({ session })) {
			return true;
		}
		return { user: { id: session.itemId } };
	},
	canReadProducts({ session }: ListAccessArgs) {
		if (!isSignedIn({ session })) {
			return false;
		}
		if (permissions.canManageProducts({ session })) {
			return true;
		}
		return { status: 'AVAILABLE' };
	},
};
