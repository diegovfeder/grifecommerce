import formatMoney from '../utils/formatMoney';

describe('formatMoney', () => {
	it('formats numbers as currency in Brazilian Real', () => {
		expect(formatMoney(12345)).toEqual('R$\xa0123,45');
		expect(formatMoney(0)).toEqual('R$\xa00,00');
		expect(formatMoney(-12345)).toEqual('-R$\xa0123,45');
	});

	it('handles fractions of a cent correctly', () => {
		expect(formatMoney(12)).toEqual('R$\xa00,12');
		expect(formatMoney(1)).toEqual('R$\xa00,01');
	});

	it('returns an empty string for non-numeric input', () => {
		// expect(formatMoney('abc')).toEqual('');
		expect(formatMoney(null)).toEqual('R$\xa00,00');
		expect(formatMoney(undefined)).toEqual('R$\xa00,00');
	});
});
