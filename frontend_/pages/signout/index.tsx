import SignOut from 'components/SignOut';

interface ISignOutPage {
	query: any;
}

// FIXME: Properly type this, id doesn't exist on SignOut component
const SignOutPage = ({ query }: ISignOutPage) => {
	return <SignOut id={query.id || undefined} />;
};

export default SignOutPage;
