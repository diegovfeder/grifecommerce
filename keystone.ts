import 'dotenv/config';
import { config } from '@keystone-next/keystone/schema';
import { statelessSessions } from '@keystone-next/keystone/session';
import { createAuth } from '@keystone-next/auth';
import { lists } from './schema';
import { sendPasswordResetEmail } from './util/mail';
import { extendGraphqlSchema } from './mutations/index';
import { permissionsList } from 'schemas/Fields';

const databaseURL = process.env.DATABASE_URL;

const sessionConfig = {
	maxAge: 60 * 60 * 24 * 360, // How long should they stay signed in?
	secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
	listKey: 'User',
	identityField: 'email',
	secretField: 'password',
	initFirstItem: {
		fields: ['name', 'email', 'password'],
		// TODO: add initial roles
	},
	passwordResetLink: {
		async sendToken(args) {
			// send the email
			await sendPasswordResetEmail(args.token, args.identity);
			// console.log(args);
		},
	},
});

export default withAuth(
	config({
		server: {
			cors: {
				// @ts-ignore
				origin: [process.env.FRONTEND_URL],
				credentials: true,
			},
		},
		db: {
			// @ts-ignore
			url: databaseURL,
			provider: 'postgresql',
			// useMigrations: true,
		},
		lists,
		extendGraphqlSchema: extendGraphqlSchema,
		ui: {
			// TODO: Update this with roles
			// Show the UI only for people who pass this test
			// FIXME: Add Access Session Filter
			// isAccessAllowed: ({ session }) => {
			// 	return !!session?.data;
			// },
		},
		session: withItemData(statelessSessions(sessionConfig), {
			// GraphQL query
			User: `id name email role { ${permissionsList.join(' ')}}`,
		}),
	}),
);
