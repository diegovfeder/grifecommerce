import "dotenv/config";
import { createAuth } from "@keystone-6/auth";
import { config } from "@keystone-6/core";
import { statelessSessions } from "@keystone-6/core/session";
import type {
	AdminUIConfig,
	BaseKeystoneTypeInfo,
	DatabaseConfig,
	GraphQLConfig,
	KeystoneConfig,
	ServerConfig,
	SessionStrategy,
} from "@keystone-6/core/types";
import { lists } from "./schema";
import { permissionsList } from "./schemas/Fields";
import { extendGraphqlSchema } from "./mutations/index";
import { sendPasswordResetEmail } from "./utils/mail";

const databaseURL =
	process.env.DATABASE_URL ||
	"";

const sessionConfig = {
	secret:
		process.env.COOKIE_SECRET ||
		"Could not access COOKIE_SECRET environment variable",
	maxAge: 60 * 60 * 24 * 360,
	secure: true,
	path: "/",
	domain: "localhost",
};

const { withAuth } = createAuth({
	listKey: "User",
	identityField: "email",
	secretField: "password",
	// sessionData: `id name email role {${permissionsList.join(' ')}}`,
	initFirstItem: {
		fields: ["name", "email", "password"],
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
			provider: "postgresql",
			url: databaseURL,
			enableLogging: true,
			useMigrations: true,
			idField: { kind: "uuid" },
		} as DatabaseConfig<BaseKeystoneTypeInfo>,
		ui: {
			isAccessAllowed: async (context) => !!context.session,
		} as AdminUIConfig<BaseKeystoneTypeInfo>,
		server: {
			cors: {
				origin: [process.env.FRONTEND_URL || "http://localhost:7777"],
				credentials: true,
			},
			port: 3000,
			maxFileSize: 200 * 1024 * 1024,
			healthCheck: true,
		} as ServerConfig<BaseKeystoneTypeInfo>,
		session: statelessSessions(
			sessionConfig
		) as SessionStrategy<BaseKeystoneTypeInfo>,
		graphql: {
			debug: process.env.NODE_ENV !== "production",
			queryLimits: { maxTotalResults: 100 },
			path: "/api/graphql",
			apolloConfig: {
				debug: true,
				/* ... */
			},
		} as GraphQLConfig,
		extendGraphqlSchema,
	}) as KeystoneConfig
);
