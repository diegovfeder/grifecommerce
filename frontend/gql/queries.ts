import gql from 'graphql-tag';

export const VERIFY_USER_EMAIL_QUERY = gql`
	query UserEmailExists($email: String!) {
		user(where: { email: $email }) {
			id
			email
		}
	}
`;

export const PRODUCT_QUERY = gql`
	query Product($id: ID!) {
		product(where: { id: $id }) {
			id
			name
			price
			description
			photo {
				id
				altText
				image {
					publicUrlTransformed
				}
			}
		}
	}
`;

export const ALL_PRODUCTS_QUERY = gql`
	query AllProducts {
		products {
			id
			name
			price
			description
			photo {
				id
				image {
					publicUrlTransformed
				}
			}
		}
	}
`;

export const PRODUCTS_QUERY = gql`
	query Products($take: Int, $skip: Int = 0) {
		products(take: $take, skip: $skip) {
			id
			name
			price
			description
			photo {
				id
				image {
					publicUrlTransformed
				}
			}
		}
	}
`;

export const PAGINATION_QUERY = gql`
	query PAGINATION_QUERY {
		productsCount
	}
`;
