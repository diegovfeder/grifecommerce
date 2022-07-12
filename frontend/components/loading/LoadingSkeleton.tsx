// TODO: Finish loading skeleton component
const LoadingSkeleton = () => {
	return (
		<div
			role="alert"
			aria-busy="true"
			aria-label="Loading..."
			data-test-id="loading-label"
			style={{
				display: 'flex',
				flex: 1,
				minHeight: '400px',
			}}
		/>
	);
};

export default LoadingSkeleton;
