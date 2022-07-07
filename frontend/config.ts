import 'dotenv/config';

export const devEndpoint =
	process.env.GRAPHQL_ENDPOINT || 'http://localhost:3000/api/graphql';

export const prodEndpoint =
	process.env.GRAPHQL_ENDPOINT ||
	'https://grifecommerce-backend.vercel.app/api/graphql';

export const totalProductsPerPage = 2;
