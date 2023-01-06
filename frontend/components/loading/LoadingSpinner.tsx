import styled from 'styled-components';

import LoadingLabel from './LoadingLabel';

const StyledLoadingSpinner = styled.div`
	border: 8px solid pink;
	border-top: 8px var(--primary) solid;
	border-radius: 50%;
	height: 48px;
	width: 48px;
	animation: spin 2s linear infinite;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
`;

interface LoadingSpinnerProps {
	testId?: string;
	loading?: boolean;
	size?: 'small' | 'medium' | 'large';
	// theme="grayscale"
}

// TODO: size
const LoadingSpinner = ({ testId, loading, size }: LoadingSpinnerProps) => {
	return loading ? (
		<div
			data-testid={testId}
			style={{
				display: 'flex',
				flex: 1,
				width: '100%',
				height: '100%',
				justifyContent: 'center',
				alignItems: 'center',
				marginTop: '1rem',
				marginBottom: '1rem',
			}}
		>
			<LoadingLabel />
			<StyledLoadingSpinner />
		</div>
	) : null;
};

export default LoadingSpinner;
