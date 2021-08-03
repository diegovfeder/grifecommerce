import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from 'components/UserComponent';

// TODO: Create tests
//  Show error message in some dialog if exists

const SIGN_OUT_MUTATION = gql`
	mutation {
		endSession
	}
`;

const SignOut = () => {
	const [signout] = useMutation(SIGN_OUT_MUTATION, {
		refetchQueries: [{ query: CURRENT_USER_QUERY }],
	});
	return (
		<button type="button" onClick={signout}>
			Sign Out
		</button>
	);
};

export default SignOut;
