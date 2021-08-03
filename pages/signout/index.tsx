import SignOut from 'components/SignOut';

interface ISignOutPage {
	query: any;
}

const SignOutPage = ({ query }: ISignOutPage) => {
	return <SignOut id={query.id || undefined} />;
};

export default SignOutPage;
