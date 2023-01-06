import 'dotenv/config';
import { createAuth } from '@keystone-6/auth';
import { config } from '@keystone-6/core';
import { statelessSessions } from '@keystone-6/core/session';
import type {
	AdminUIConfig,
	BaseKeystoneTypeInfo,
	DatabaseConfig,
	GraphQLConfig,
	KeystoneConfig,
	ServerConfig,
} from '@keystone-6/core/types';

import { lists } from './schema';
import { extendGraphqlSchema } from './mutations/index';
import { sendPasswordResetEmail } from './utils/mail';

type StatelessSessionsOptions = {
	secret: string;
	maxAge?: number;
	secure?: boolean;
	path?: string;
	domain?: string;
	sameSite?: true | false | 'lax' | 'strict' | 'none';
};

const {
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET,
	CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_FOLDER,
	COOKIE_SECRET,
	DATABASE_URL,
	FRONTEND_URL,
	MAIL_PASS,
	MAIL_USER,
	NODE_ENV,
	PORT,
	STRIPE_SECRET,
} = process.env;

if (NODE_ENV !== 'production') {
	console.log({
		CLOUDINARY_CLOUD_NAME,
		CLOUDINARY_API_KEY,
		CLOUDINARY_API_SECRET,
		COOKIE_SECRET,
		DATABASE_URL,
		FRONTEND_URL,
		MAIL_USER,
		MAIL_PASS,
		NODE_ENV,
		PORT,
		STRIPE_SECRET,
	});
}

const sessionConfig: StatelessSessionsOptions = {
	secret: COOKIE_SECRET,
	maxAge: 60 * 60 * 24 * 360,
	secure: NODE_ENV === 'production',
};

const { withAuth } = createAuth({
	listKey: 'User',
	identityField: 'email',
	secretField: 'password',
	sessionData: `id name email role {
		canManageCart
		canManageOrderItems
		canManageOrders
		canManageProducts
		canManageRoles
		canManageUsers
	}`,
	initFirstItem: {
		fields: ['name', 'email', 'password'],
		itemData: {
			role: {
				create: {
					name: 'Owner',
					canManageCart: true,
					canManageOrderItems: true,
					canManageOrders: true,
					canManageProducts: true,
					canManageRoles: true,
					canManageUsers: true,
				},
			},
		},
		skipKeystoneWelcome: true,
	},
	passwordResetLink: {
		sendToken: async ({ token, identity }: any) =>
			await sendPasswordResetEmail(token, identity),
		tokensValidForMins: 24 * 60,
	},
});

export default withAuth(
	config({
		lists,
		db: {
			provider: 'postgresql',
			url: DATABASE_URL,
			enableLogging: true,
			useMigrations: true,
			idField: { kind: 'uuid' },
		} as DatabaseConfig<BaseKeystoneTypeInfo>,
		ui: {
			isAccessAllowed: async context => {
				console.log({ context });
				return !!context.session?.data;
			},
		} as AdminUIConfig<BaseKeystoneTypeInfo>,
		server: {
			cors: {
				origin: [FRONTEND_URL, 'http://localhost:7777', /\.grife\.app$/],
				credentials: true,
			},
			port: PORT || 3000,
			maxFileSize: 200 * 1024 * 1024,
			healthCheck: true,
		} as ServerConfig<BaseKeystoneTypeInfo>,
		session: statelessSessions(sessionConfig),
		graphql: {
			debug: NODE_ENV !== 'production',
			queryLimits: { maxTotalResults: 100 },
			path: '/api/graphql',
			apolloConfig: {
				debug: NODE_ENV !== 'production',
			},
		} as GraphQLConfig,
		extendGraphqlSchema,
	}) as KeystoneConfig,
);
