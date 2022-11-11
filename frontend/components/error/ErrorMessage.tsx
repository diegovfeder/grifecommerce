import { ApolloError } from '@apollo/client';
import StyledErrorMessage from '../styles/StyledErrorMessage';

const ErrorMessage = ({ error }: { error: ApolloError | null | undefined }) => {
	if (!error || !error.message) return null;
	if (
		error.networkError &&
		'result' in error.networkError &&
		error.networkError.result.errors.length
	) {
		return error.networkError.result.errors.map(
			(error: ApolloError, i: number) => (
				<StyledErrorMessage key={i}>
					<p data-test-id="graphql-error">
						<strong>Error:</strong>
						{error.message.replace('GraphQL error: ', '')}
					</p>
				</StyledErrorMessage>
			),
		);
	}
	return (
		<StyledErrorMessage data-test-id="error-message-component">
			<p data-test-id="graphql-error">
				<strong>Error:</strong>
				{error.message.replace('GraphQL error: ', '')}
			</p>
		</StyledErrorMessage>
	);
};

export default ErrorMessage;
