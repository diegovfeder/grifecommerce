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
	SessionStrategy,
} from '@keystone-6/core/types';
import { lists } from './schema';
// import { permissionsList } from './schemas/Fields';
import { extendGraphqlSchema } from './mutations/index';
import { sendPasswordResetEmail } from './utils/mail';

const { COOKIE_SECRET, DATABASE_URL, FRONTEND_URL, PORT, NODE_ENV } =
	process.env;

const sessionConfig = {
	secret: COOKIE_SECRET,
	maxAge: 60 * 60 * 24 * 360,
	secure: true,
};

const { withAuth } = createAuth({
	listKey: 'User',
	identityField: 'email',
	secretField: 'password',
	sessionData: 'id name email',
	initFirstItem: {
		fields: ['name', 'email', 'password'],
		itemData: { isAdmin: true },
		skipKeystoneWelcome: false,
	},
	passwordResetLink: {
		sendToken: async ({ token, identity }: any) => {
			await sendPasswordResetEmail(token, identity);
		},
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
			// isAccessAllowed: async (context) => !!context.session?.data,
			isAccessAllowed: async context => true,
		} as AdminUIConfig<BaseKeystoneTypeInfo>,
		server: {
			cors: {
				// origin: [FRONTEND_URL, 'http://localhost:7777', /\.grife\.app$/],
				origin: false,
				credentials: true,
			},
			port: PORT || 3000,
			maxFileSize: 200 * 1024 * 1024,
			healthCheck: true,
		} as ServerConfig<BaseKeystoneTypeInfo>,
		session: statelessSessions(
			sessionConfig,
		) as SessionStrategy<BaseKeystoneTypeInfo>,
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
