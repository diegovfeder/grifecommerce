import { ReactNode } from 'react';
import useUserQuery from '../hooks/useUserQuery';
import SignIn from './SignIn';

const PleaseSignIn = ({ children }: { children: ReactNode }) => {
	const user = useUserQuery();
	return <>{!user ? <SignIn /> : children}</>;
};

export default PleaseSignIn;
