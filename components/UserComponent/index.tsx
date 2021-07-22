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
				# TODO: Query the cart once we have it
			}
		}
	}
`;

const useUser = () => {
	const { data } = useQuery(CURRENT_USER_QUERY);
	return data?.authenticatedItem;
};

export { CURRENT_USER_QUERY, useUser };

// function UserComponent({}: UserComponentProps) {
// 	return (
// 		<>
// 			<h1>UserComponent</h1>
// 		</>
// 	);
// }

// export default UserComponent;
