import RequestPasswordReset from '../components/RequestPasswordReset';
import Reset from '../components/Reset';

const ResetPage = ({ query }: { query: { token: string } }) => {
	if (!query?.token) {
		return (
			<div>
				<p>Sorry you must supply a token</p>
				<RequestPasswordReset />
			</div>
		);
	}
	return (
		<div>
			<p>RESET YOUR PASSWORD</p>
			<Reset token={query.token} />
		</div>
	);
};

export default ResetPage;
