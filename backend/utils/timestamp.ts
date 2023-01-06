export function timestamp() {
	// sometime in the last 30 days
	const stampy =
		Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30);
	return new Date(stampy).toISOString();
}
