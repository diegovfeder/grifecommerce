import gql from 'graphql-tag';

export const SEND_USER_PASSWORD_RESET_LINK_MUTATION = gql`
	mutation SendUserPasswordResetLink($email: String!) {
		sendUserPasswordResetLink(email: $email)
	}
`;
