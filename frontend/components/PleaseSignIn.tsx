import React from 'react';
import useUserQuery from '../hooks/useUserQuery';
import SignIn from './SignIn';

const PleaseSignIn = ({ children }: { children: React.ReactNode }) => {
	const user = useUserQuery();
	return <>{!user ? <SignIn /> : children}</>;
};

export default PleaseSignIn;
