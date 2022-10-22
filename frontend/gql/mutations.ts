import gql from 'graphql-tag';

export const SEND_USER_PASSWORD_RESET_LINK_MUTATION = gql`
	mutation SendUserPasswordResetLink($email: String!) {
		sendUserPasswordResetLink(email: $email)
	}
`;

export const RESET_PASSWORD_MUTATION = gql`
	mutation ResetPassword($email: String!, $password: String!, $token: String!) {
		redeemUserPasswordResetToken(
			email: $email
			token: $token
			password: $password
		) {
			code
			message
		}
	}
`;

export const SIGN_UP_MUTATION = gql`
	mutation SignUp($email: String!, $name: String!, $password: String!) {
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

export const CREATE_PRODUCT_MUTATION = gql`
	mutation CreateProduct(
		$name: String!
		$description: String!
		$price: Int!
		$photo: Upload
		$status: String!
	) {
		createProduct(
			data: {
				name: $name
				description: $description
				price: $price
				photo: { create: { image: $photo, altText: $name } }
				status: $status
			}
		) {
			id
			name
			description
			price
			photo
		}
	}
`;

export const UPDATE_PRODUCT_MUTATION = gql`
	mutation UpdateProduct(
		$id: ID!
		$name: String
		$description: String
		$price: Int
	) {
		updateProduct(
			where: { id: $id }
			data: { name: $name, description: $description, price: $price }
		) {
			id
			name
			description
			price
		}
	}
`;
