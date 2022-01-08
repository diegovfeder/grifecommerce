import { useUser } from './User';
import SignIn from './SignIn';

// eslint-disable-next-line react/prop-types
export default function PleaseSignIn({ children }) {
	const me = useUser();
	if (!me) return <SignIn />;
	return children;
}
