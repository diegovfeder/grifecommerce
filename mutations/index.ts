import { graphQLSchemaExtension } from '@keystone-6/core';
import addToCart from './addToCart';

// Forces a fake graphql-tag template literal that enables code "coloring"
const graphql = String.raw;

export const extendGraphqlSchema = graphQLSchemaExtension({
	typeDefs: graphql`
		type Mutation {
			addToCart(productId: ID): CartItem
		}
	`,
	resolvers: {
		Mutation: {
			addToCart,
		},
	},
});
