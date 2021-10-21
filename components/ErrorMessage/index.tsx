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

const ErrorMessage = (props: { error: ApolloError | undefined }) => {
	if (!props.error || !props.error.message) return null;
	if (
		props.error.networkError &&
		'result' in props.error.networkError &&
		props.error.networkError.result.errors.length
	) {
		return props.error.networkError.result.errors.map(
			(error: ApolloError, i: number) => (
				<StyledErrorMessage key={i}>
					<p data-test="graphql-error">
						<strong>Shoot!</strong>
						{error.message.replace('GraphQL error: ', '')}
					</p>
				</StyledErrorMessage>
			),
		);
	}
	return (
		<StyledErrorMessage
			data-test-id="ErrorMessage"
		>
			<p data-test="graphql-error">
				<strong>Shoot!</strong>
				{props.error.message.replace('GraphQL error: ', '')}
			</p>
		</StyledErrorMessage>
	);
};

export default ErrorMessage;
