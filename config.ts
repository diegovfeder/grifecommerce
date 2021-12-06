// This is client side config only - don't put anything in here that shouldn't be public!
export const devEndpoint = `http://localhost:3000/api/graphql`;
export const prodEndpoint =
	process.env.GRAPHQL_ENDPOINT || `http://localhost:3000/api/graphql`;
// export const prodEndpoint = `http://localhost:3000/api/graphql`;
export const totalProductsPerPage = 4;
