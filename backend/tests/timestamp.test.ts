import { timestamp } from '../utils/timestamp';

describe('timestamp', () => {
	it('should return a string in ISO format', () => {
		const result = timestamp();
		expect(typeof result).toBe('string');
		expect(result).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/);
	});

	it('should return a date within the last 30 days', () => {
		const result = new Date(timestamp());
		const now = new Date();
		const diff = now.getTime() - result.getTime();
		const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
		expect(diffDays).toBeLessThanOrEqual(30);
	});
});
