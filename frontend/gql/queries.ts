import gql from 'graphql-tag';


// User
export const USER_EMAIL_QUERY = gql`
	query UserEmail($email: String!) {
		user(where: { email: $email }) {
			id
			email
		}
	}
`;

export const CURRENT_USER_QUERY = gql`
	query CurrentUser {
		authenticatedItem {
			... on User {
				id
				email
				name
				cart {
					id
					quantity
					product {
						id
						price
						name
						description
						photo {
							image {
								publicUrlTransformed
							}
						}
					}
				}
			}
		}
	}
`;

// Product
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

export const PRODUCTS_COUNT_QUERY = gql`
	query ProductsCount {
		productsCount
	}
`;



export const SEARCH_PRODUCTS_QUERY = gql`
	query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
		searchTerms: products(
			where: {
				OR: [
					{ name: { contains: $searchTerm } }
					{ description: { contains: $searchTerm } }
				]
			}
		) {
			id
			name
			photo {
				image {
					publicUrlTransformed
				}
			}
		}
	}
`;
