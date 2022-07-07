import { gql, useQuery } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
	query CurrentUserQuery {
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

const useUserQuery = () => {
	const { data } = useQuery(CURRENT_USER_QUERY);
	return data?.authenticatedItem;
};

export default useUserQuery;
