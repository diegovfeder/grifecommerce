import formatMoney from '../utils/formatMoney';

describe('format Money function', () => {
	it('works with fractional reals', () => {
		expect(formatMoney(1)).toEqual('R$ 0,01');
		expect(formatMoney(10)).toEqual('R$ 0,10');
		expect(formatMoney(9)).toEqual('R$ 0,09');
		expect(formatMoney(40)).toEqual('R$ 0,40');
	});

	it('leaves off cents when its whole reals', () => {
		expect(formatMoney(5000)).toEqual('R$ 50');
		expect(formatMoney(100)).toEqual('R$ 1');
		expect(formatMoney(50000000)).toEqual('R$ 500.000');
	});

	it('works with whole and fractional reals', () => {
		expect(formatMoney(140)).toEqual('R$ 1,40');
		expect(formatMoney(5012)).toEqual('R$ 50,12');
		expect(formatMoney(110)).toEqual('R$ 1,10');
		expect(formatMoney(101)).toEqual('R$ 1,01');
		expect(formatMoney(34534545345345)).toEqual('R$ 345.345.453.453,45');
	});
});
