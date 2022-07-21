const formatterOptions = {
	style: 'currency',
	currency: 'BRL',
	minimumFractionDigits: 2,
};

const formatter = Intl.NumberFormat('pt-BR', formatterOptions);

const formatMoney = (amount = 0) => {
	return formatter.format(amount / 100);
};

export default formatMoney;
