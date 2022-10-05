import formatMoney from '../utils/formatMoney';

describe('formatMoney', () => {
	it('works with fractional reals', () => {
		expect(formatMoney(1)).toEqual('R$\xa00,01');
		expect(formatMoney(10)).toEqual('R$\xa00,10');
		expect(formatMoney(9)).toEqual('R$\xa00,09');
		expect(formatMoney(40)).toEqual('R$\xa00,40');
	});

	it('leaves off cents when its whole reals', () => {
		expect(formatMoney(5000)).toEqual('R$\xa050,00');
		expect(formatMoney(100)).toEqual('R$\xa01,00');
		expect(formatMoney(50000000)).toEqual('R$\xa0500.000,00');
	});

	it('works with whole and fractional reals', () => {
		expect(formatMoney(140)).toEqual('R$\xa01,40');
		expect(formatMoney(5012)).toEqual('R$\xa050,12');
		expect(formatMoney(110)).toEqual('R$\xa01,10');
		expect(formatMoney(101)).toEqual('R$\xa01,01');
		expect(formatMoney(34534545345345)).toEqual('R$\xa0345.345.453.453,45');
	});
});
