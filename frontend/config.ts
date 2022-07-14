const devEndpoint =
	process.env.GRAPHQL_ENDPOINT || 'http://localhost:3000/api/graphql';

// export const prodEndpoint =
// 	process.env.GRAPHQL_ENDPOINT ||
// 	'https://grifecommerce-backend.vercel.app/api/graphql';

const prodEndpoint =
	process.env.GRAPHQL_ENDPOINT ||
	'https://grifecommerce-backend.herokuapp.com/api/graphql';

export const endpoint =
	process.env.NODE_ENV === 'production' ? prodEndpoint : devEndpoint;

export const totalProductsPerPage = 2;
