import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import {
	withItemData,
	statelessSessions,
} from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { insertSeedData } from './seed-data';

// TODO: isProduction or isDevelopment>
// Maybe pass a link to use a some generic db? open db???
const databaseURL =
	process.env.DATABASE_URL || 'mongodb://localhost/keystone...';

const sessionConfig = {
	maxAge: 60 * 60 * 24 * 360, // How long should they stay signed in?
	secret: process.env.COOKIE_SECRET || '',
};

const { withAuth } = createAuth({
	listKey: 'User',
	identityField: 'email',
	secretField: 'password',
	initFirstItem: {
		fields: ['name', 'email', 'password'],
		// TODO: add initial roles
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
			adapter: 'mongoose',
			url: databaseURL,
			async onConnect(keystone) {
				console.log('Connected to the database');
				if (process.argv.includes('--seed-data')) {
					await insertSeedData(keystone);
				}
			},
		},
		lists: createSchema({
			User,
			Product,
			ProductImage,
			// Schema items go in here
		}),
		ui: {
			// TODO: Update this with roles
			// Show the UI only for people who pass this test
			isAccessAllowed: ({ session }) => {
				return !!session?.data;
			},
		},
		session: withItemData(statelessSessions(sessionConfig), {
			// GraphQL query
			User: `id`,
		}),
		// TODO: Add session values here
	}),
);
