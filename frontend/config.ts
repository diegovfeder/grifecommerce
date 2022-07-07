import 'dotenv/config';

const { GRAPHQL_ENDPOINT } = process.env;

export const devEndpoint =
	GRAPHQL_ENDPOINT || 'http://localhost:3000/api/graphql';

export const prodEndpoint =
	GRAPHQL_ENDPOINT || 'https://grifecommerce-backend.vercel.app/api/graphql';

export const totalProductsPerPage = 2;
