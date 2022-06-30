import gql from 'graphql-tag';

export const SEND_USER_PASSWORD_RESET_LINK_MUTATION = gql`
	mutation SendUserPasswordResetLink($email: String!) {
		sendUserPasswordResetLink(email: $email)
	}
`;

export const SIGN_UP_MUTATION = gql`
	mutation SIGNUP_MUTATION(
		$email: String!
		$name: String!
		$password: String!
	) {
		createUser(data: { email: $email, name: $name, password: $password }) {
			id
			email
			name
		}
	}
`;

export const CREATE_ORDER_MUTATION = gql`
	mutation CreateOrder($token: String!) {
		checkout(token: $token) {
			id
			charge
			total
			items {
				id
				name
			}
		}
	}
`;
