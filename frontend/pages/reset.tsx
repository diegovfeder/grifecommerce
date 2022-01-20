import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

// TODO: Properly type query
const ResetPage = ({ query }: { query: any }) => {
	if (!query?.token) {
		return (
			<div>
				<p>Sorry you must supply a token</p>
				<RequestReset />
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
