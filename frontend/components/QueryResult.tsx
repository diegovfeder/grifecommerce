import React from 'react';
import styled from 'styled-components';
// TODO: Import some loadingSpinner
// import { LoadingSpinner } from '@apollo/space-kit/Loaders/LoadingSpinner';

interface QueryResultProps {
	loading: boolean;
	error: any;
	data: any;
	children: React.ReactNode;
}

const QueryResult = ({ loading, error, data, children }: QueryResultProps) => {
	if (error) return <p>{`ERROR: ${error.message}`}</p>;
	if (loading) {
		return (
			<SpinnerContainer>
				{/* <LoadingSpinner data-testid="spinner" size="large" theme="grayscale" /> */}
			</SpinnerContainer>
		);
	}
	if (!data) {
		return <p>Nothing to show...</p>;
	}
	if (data) {
		return children;
	}
};

export default QueryResult;

/** Query Result styled components */
const SpinnerContainer = styled.div({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
	height: '100vh',
});
