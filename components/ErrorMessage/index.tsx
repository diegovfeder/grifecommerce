import styled from 'styled-components';
import React from 'react';
import { ApolloError } from '@apollo/client';

const StyledErrorMessage = styled.div`
	padding: 2rem;
	background: white;
	margin: 2rem 0;
	border: 1px solid rgba(0, 0, 0, 0.05);
	border-left: 5px solid red;
	p {
		margin: 0;
		font-weight: 100;
	}
	strong {
		margin-right: 1rem;
	}
`;

// FIXME: Properly type this
interface IErrorMessage {
	error: any;
}

const ErrorMessage = ({ error }: IErrorMessage) => {
	if (!error || !error.message) return null;
	if (
		error.networkError &&
		error.networkError.result &&
		error.networkError.result.errors.length
	) {
		// FIXME: Properly type this
		return error.networkError.result.errors.map((error: any, i: number) => (
			<StyledErrorMessage key={i}>
				<p data-test="graphql-error">
					<strong>Shoot!</strong>
					{error.message.replace('GraphQL error: ', '')}
				</p>
			</StyledErrorMessage>
		));
	}
	return (
		<StyledErrorMessage>
			<p data-test="graphql-error">
				<strong>Shoot!</strong>
				{error.message.replace('GraphQL error: ', '')}
			</p>
		</StyledErrorMessage>
	);
};

export default ErrorMessage;
