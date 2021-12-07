import 'dotenv/config';
import { config } from '@keystone-6/core';
// import type { ListSchemaConfig } from '@keystone-6/core/types';
import { statelessSessions } from '@keystone-6/core/session';
import { lists } from './schema';
import { createAuth } from '@keystone-6/auth';
import { sendPasswordResetEmail } from './util/mail';
import { extendGraphqlSchema } from './mutations/index';
import { permissionsList } from './schemas/Fields';


const { withAuth } = createAuth({
	listKey: 'User',
	identityField: 'email',
	secretField: 'password',
	// sessionData: 'id isAdmin',
	sessionData: `id name email role { ${permissionsList.join(' ')}}`,
	initFirstItem: {
		fields: ['name', 'email', 'password'],
		itemData: { isAdmin: true },
		skipKeystoneWelcome: false,

		// TODO: add initial roles
	},
	passwordResetLink: {
		async sendToken({ token, identity }) {
			// send the email
			await sendPasswordResetEmail(token, identity);
			// console.log(args);
		},
		tokensValidForMins: 60,
	},
	// magicAuthLink: {
	//   sendToken: async ({ itemId, identity, token, context }) => { /* ... */ },
	//   tokensValidForMins: 60,
	// },
});

const databaseURL =
	process.env.DATABASE_URL ||
	'Could not access DATABASE_URL environment variable';

const sessionConfig = {
	maxAge: 60 * 60 * 24 * 360, // How long should they stay signed in?
	secret: process.env.COOKIE_SECRET,
};

export default withAuth(
	config({
		extendGraphqlSchema,
		server: {
			cors: {
				// @ts-ignore
				origin: [process.env.FRONTEND_URL],
				credentials: true,
			},
			port: 3000,
			maxFileSize: 200 * 1024 * 1024,
			extendExpressApp: (app, createContext) => {
				/* ... */
			},
			// healthCheck: true,
			healthCheck: {
				path: '/my-health-check',
				data: () => ({
					status: 'healthy',
					timestamp: Date.now(),
					uptime: process.uptime(),
				}),
			},
		},
		db: {
			provider: 'postgresql',
			url: databaseURL,
			onConnect: async context => {
				/* ... */
			},
			// Optional advanced configuration
			enableLogging: true,
			useMigrations: true,
			idField: { kind: 'uuid' },
		},
		graphql: {
			debug: process.env.NODE_ENV !== 'production',
			queryLimits: { maxTotalResults: 100 },
			path: '/api/graphql',
			apolloConfig: {
				debug: true,
				/* ... */
			},
		},
		lists,
		ui: {
			// Show the UI only for poeple who pass this test
			isAccessAllowed: ({ session }) => !!session?.data,
		},
		session: statelessSessions(sessionConfig),
	}),
);

// import { text, password, checkbox } from '@keystone-6/core/fields';
// const { withAuth } = createAuth({
// 	listKey: 'User',
// 	identityField: 'email',
// 	secretField: 'password',
// 	// sessionData: 'id isAdmin',
// 	sessionData: `id name email role { ${permissionsList.join(' ')}}`,
// 	initFirstItem: {
// 		fields: ['name', 'email', 'password'],
// 		// TODO: add initial roles
// 	},
// 	passwordResetLink: {
// 		async sendToken(args) {
// 			// send the email
// 			await sendPasswordResetEmail(args.token, args.identity);
// 			// console.log(args);
// 		},
// 	},
// });
