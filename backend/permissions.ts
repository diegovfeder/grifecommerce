import { ListAccessArgs } from './@types/keystone';

export function isSignedIn({ session }: ListAccessArgs): boolean {
	return !!session;
}

// TODO: isAdmin
export function isAdmin({ session }: ListAccessArgs): boolean {
	// A user is admin if they have all the roles.
	// should I map thru roles and return true if all roles are true?

	return false;
	// return !!session?.data.isAdmin;
}

// FIXME: Currently all permissions are being set to true if user is signed in
export function canManageCart({ session }: ListAccessArgs): boolean {
	if (!isSignedIn({ session })) {
		return false;
	}

	return true;
}

export function canManageOrderItems({ session }: ListAccessArgs): boolean {
	if (!isSignedIn({ session })) {
		return false;
	}

	return true;
}

export function canManageOrders({ session }: ListAccessArgs): boolean {
	if (!isSignedIn({ session })) {
		return false;
	}

	return true;
}

export function canManageProducts({ session }: ListAccessArgs): boolean {
	if (!isSignedIn({ session })) {
		return false;
	}

	return true;
	// return { user: { id: session.itemId } };
}

export function canManageRoles({ session }: ListAccessArgs): boolean {
	if (!isSignedIn({ session })) {
		return false;
	}

	return true;
	// return { user: { id: session.itemId } };
}

export function canManageUsers({ session }: ListAccessArgs): boolean {
	if (!isSignedIn({ session })) {
		return false;
	}

	return true;
}

export function canOrder({ session }: ListAccessArgs): boolean {
	if (!isSignedIn({ session })) {
		return false;
	}

	return true;
}

export function canReadProducts(): boolean {
	return true;
}

// Check role?
// return !!session?.data.role?...;

// Check user ssession equals user id?
// return { user: { id: session.itemId } };

// Check order, user equals session?
// return { order: { user: { id: session.itemId } } };
