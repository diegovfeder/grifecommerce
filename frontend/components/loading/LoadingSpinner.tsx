import styled from 'styled-components';

const StyledLoadingSpinner = styled.div`
	border: 8px solid pink;
	border-top: 8px red solid;
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

const LoadingSpinner = () => {
	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				width: '100%',
				height: '100%',
				justifyContent: 'center',
				alignItems: 'center',
				margin: '2rem',
			}}
		>
			<StyledLoadingSpinner />
		</div>
	);
};

export default LoadingSpinner;
