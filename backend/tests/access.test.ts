// I

import { isSignedIn, permissions } from '../access';

describe('access', () => {
	describe('isSignedIn', () => {
		it('returns true when session is present', () => {
			const session = {
				itemId: 'abc123',
				listKey: 'User',
				data: {
					id: 'abc123',
					name: 'Test User',
				},
			};
			expect(isSignedIn({ session })).toBe(true);
		});

		it('returns false when session is not present', () => {
			expect(isSignedIn({})).toBe(false);
		});
	});

	describe('permissions', () => {
		it('canManageCart', () => {
			const session = {
				itemId: 'abc123',
				listKey: 'User',
				data: {
					id: 'abc123',
					name: 'Test User',
				},
			};
			expect(permissions.canManageCart({ session })).toBe(true);
		});

		it('canManageOrderItems', () => {
			const session = {
				itemId: 'abc123',
				listKey: 'User',
				data: {
					id: 'abc123',
					name: 'Test User',
				},
			};
			expect(permissions.canManageOrderItems({ session })).toBe(false);
		});

		it('canManageOrders', () => {
			const session = {
				itemId: 'abc123',
				listKey: 'User',
				data: {
					id: 'abc123',
					name: 'Test User',
				},
			};
			expect(permissions.canManageOrders({ session })).toBe(false);
		});

		it('canManageProducts', () => {
			const session = {
				itemId: 'abc123',
				listKey: 'User',
				data: {
					id: 'abc123',
					name: 'Test User',
				},
			};
			expect(permissions.canManageProducts({ session })).toBe(false);
		});

		it('canManageRoles', () => {
			const session = {
				itemId: 'abc123',
				listKey: 'User',
				data: {
					id: 'abc123',
					name: 'Test User',
				},
			};
			expect(permissions.canManageRoles({ session })).toBe(false);
		});

		it('canManageUsers', () => {
			const session = {
				itemId: 'abc123',
				listKey: 'User',
				data: {
					id: 'abc123',
					name: 'Test User',
				},
			};
			expect(permissions.canManageUsers({ session })).toBe(false);
		});

		it('canOrder', () => {
			const session = {
				itemId: 'abc123',
				listKey: 'User',
				data: {
					id: 'abc123',
					name: 'Test User',
				},
			};
			expect(permissions.canOrder({ session })).toBe(false);
		});

		it('canReadProducts', () => {
			expect(permissions.canReadProducts()).toBe(true);
		});
	});
});
