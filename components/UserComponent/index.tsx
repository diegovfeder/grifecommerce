import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

// interface UserComponentProps {}

const CURRENT_USER_QUERY = gql`
	query {
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

const useUser = () => {
	const { data } = useQuery(CURRENT_USER_QUERY);
	return data?.authenticatedItem;
};

export { CURRENT_USER_QUERY, useUser };
