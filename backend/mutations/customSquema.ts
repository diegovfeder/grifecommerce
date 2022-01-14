import { graphql } from '@keystone-6/core';

export const extendGraphqlSchema = graphql.extend(base => {
  const AddToCart = graphql.object<{ productId: string }>()({
			return {
				mutation: {
