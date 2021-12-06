import RequestPasswordReset from 'components/forms/RequestPasswordReset';
import Reset from 'components/forms/NewPassword';

const ResetPage = ({ query }: any) => {
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
			{/* <p>RESET YOUR PASSWORD: {query.token} </p> */}
			<Reset token={query.token} />
		</div>
	);
};

export default ResetPage;
