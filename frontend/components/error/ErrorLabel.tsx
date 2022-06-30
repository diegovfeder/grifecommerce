const ErrorLabel = () => {
	return (
		<p
			role="alert"
			aria-busy="true"
			aria-label="Error!"
			data-test-id="error-label"
		>
			Error
		</p>
	);
};

export default ErrorLabel;
