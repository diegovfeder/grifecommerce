import { KeystoneGraphQLAPI, KeystoneListsAPI } from '@keystone-6/core/types';
import type { Permission } from '../schemas/PermissionFields';

export type { Permission } from '../schemas/PermissionFields';

export type Session = {
	itemId: string;
	listKey: string;
	data: {
		name: string;
		role?: {
			id: string;
			name: string;
		} & {
			[key in Permission]: boolean;
		};
	};
};

export type ListsAPI = KeystoneListsAPI<any /* KeystoneListsTypeInfo */>;
export type GraphqlAPI = KeystoneGraphQLAPI;

export type AccessArgs = {
	session?: Session;
	item?: any;
};

export type AccessControl = {
	[key: string]: (args: AccessArgs) => any;
};

export type ListAccessArgs = {
	itemId?: string;
	session?: Session;
};
