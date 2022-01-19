import { graphQLSchemaExtension } from '@keystone-6/core';
import type { ExtendGraphqlSchema } from '@keystone-6/core/types';
import addToCart from './_addToCart';

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
}) as ExtendGraphqlSchema;
