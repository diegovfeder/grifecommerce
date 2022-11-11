// TODO: Finish loading skeleton component with a skeleton animation,
// TODO: Pass width and height as props
// TODO: pass loading state as props?
// TODO: override styles as props...
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
