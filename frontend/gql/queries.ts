import gql from 'graphql-tag';

export const VERIFY_USER_EMAIL_QUERY = gql`
	query UserEmailExists($email: String!) {
		user(where: { email: $email }) {
			id
			email
		}
	}
`;
