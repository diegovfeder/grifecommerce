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
import { permissionsList } from './schemas/Fields';
import { extendGraphqlSchema } from './mutations/index';
import { sendPasswordResetEmail } from './utils/mail';

/* Session Store */
// https://keystonejs.com/docs/apis/session
// import redis from 'redis';
// import { redisSessionStore } from '@keystone-6/session-store-redis';
// import { storedSessions } from '@keystone-6/core/session';

// export default config({
//   session: storedSessions({
//     store: redisSessionStore({ client: redis.createClient() }),
//     /* ... */,
//     }),
//   /* ... */
// });

type StatelessSessionsOptions = {
	secret: string;
	maxAge?: number;
	secure?: boolean;
	path?: string;
	domain?: string;
	sameSite?: true | false | 'lax' | 'strict' | 'none';
};

const { COOKIE_SECRET, DATABASE_URL, FRONTEND_URL, PORT, NODE_ENV } =
	process.env;

console.log({ COOKIE_SECRET, DATABASE_URL, FRONTEND_URL, PORT, NODE_ENV });
console.log(process.env.COOKIE_SECRET);

const sessionConfig: StatelessSessionsOptions = {
	secret: COOKIE_SECRET,
	maxAge: 60 * 60 * 24 * 360,
	secure: NODE_ENV === 'production',
};

const { withAuth } = createAuth({
	listKey: 'User',
	identityField: 'email',
	secretField: 'password',
	sessionData: `id name email role { ${permissionsList.join(' ')} }`,
	initFirstItem: {
		fields: ['name', 'email', 'password'],
		itemData: { isAdmin: true },
		skipKeystoneWelcome: false,
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
			// isAccessAllowed: async context => true,
			isAccessAllowed: async context => {
				console.log({ context });
				return !!context.session?.data;
			},
		} as AdminUIConfig<BaseKeystoneTypeInfo>,
		server: {
			cors: {
				// origin: false,
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
