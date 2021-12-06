import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { CURRENT_USER_QUERY } from 'components/UserComponent';

const SIGN_OUT_MUTATION = gql`
	mutation {
		endSession
	}
`;

const SignOut = () => {
	const [signOutMutation] = useMutation(SIGN_OUT_MUTATION, {
		refetchQueries: [{ query: CURRENT_USER_QUERY }],
	});

	const router = useRouter();
	const resolveSignOut = async () => {
		signOutMutation();
		router.push({
			pathname: `/signin`,
		});
	};

	return (
		<button type="button" onClick={resolveSignOut}>
			SIGN OUT
		</button>
	);
};

export default SignOut;
