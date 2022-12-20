import { ListAccessArgs } from './@types/keystone';

export function isSignedIn({ session }: ListAccessArgs) {
	return !!session;
}

export const permissions = {
	canManageCart: ({ session }: ListAccessArgs) => {
		if (!isSignedIn({ session })) {
			return false;
		}

		return !!session?.data.role?.canManageCart;
	},
	canManageOrderItems: ({ session }: ListAccessArgs) => {
		if (!isSignedIn({ session })) {
			return false;
		}

		return !!session?.data.role?.canManageOrderItems;
		// return { order: { user: { id: session.itemId } } };
	},
	canManageOrders: ({ session }: ListAccessArgs) => {
		if (!isSignedIn({ session })) {
			return false;
		}

		return !!session?.data.role?.canManageOrders;
	},
	canManageProducts: ({ session }: ListAccessArgs) => {
		if (!isSignedIn({ session })) {
			return false;
		}

		return !!session?.data.role?.canManageProducts;
		// return { user: { id: session.itemId } };
	},
	canManageRoles: ({ session }: ListAccessArgs) => {
		if (!isSignedIn({ session })) {
			return false;
		}

		return !!session?.data.role?.canManageRoles;
		// return { user: { id: session.itemId } };
	},
	canManageUsers: ({ session }: ListAccessArgs) => {
		if (!isSignedIn({ session })) {
			return false;
		}

		return !!session?.data.role?.canManageUsers;
		// return { id: session.itemId };
	},
	canOrder: ({ session }: ListAccessArgs) => {
		if (!isSignedIn({ session })) {
			return false;
		}

		return !!session?.data.role?.canOrder;
		// return { user: { id: session.itemId } };
	},
	canReadProducts: () => {
		return true;
		// return { status: 'AVAILABLE' };
	},
};
