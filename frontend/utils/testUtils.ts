// eslint-disable-next-line import/no-extraneous-dependencies
import casual from 'casual';
import { PRODUCTS_COUNT_QUERY } from '../gql/queries';

// seed it so we get consistent results
casual.seed(777);

const fakeItem = () => ({
	// __typename: 'Item',
	id: '718b7ac6-7cf1-47e7-b1de-c4a13ca92f2d',
	name: 'GRIFE Sample Pack - (Yellow)',
	description:
		'This our first sample pack for summer beats in a sunny day, when all is yellow :)',
	price: 5000,
	// user: null,
	photo: {
		// FIXME:
		// id: 'abc123',
		// altText: 'dogs are best',
		image: {
			publicUrlTransformed: '/samplepack_yellow.jpg',
		},
	},
});

const fakeUser = (rest?: any) => ({
	__typename: 'User',
	id: '4234',
	name: casual.name,
	email: casual.email,
	permissions: ['ADMIN'],
	orders: [],
	cart: [],
	...rest,
});

const fakeOrderItem = () => ({
	__typename: 'OrderItem',
	id: casual.uuid,
	image: {
		image: `${casual.word}.jpg`,
	},
	name: casual.words(),
	price: 4234,
	quantity: 1,
	description: casual.words(),
});

const fakeOrder = () => ({
	__typename: 'Order',
	id: 'ord123',
	charge: 'ch_123',
	total: 40000,
	items: [fakeOrderItem(), fakeOrderItem()],
	createdAt: '2022-12-11T20:16:13.797Z',
	user: fakeUser(),
});

const fakeCartItem = (rest?: any) => ({
	__typename: 'CartItem',
	id: 'omg123',
	quantity: 3,
	product: fakeItem(),
	user: fakeUser(),
	...rest,
});

// FIXME: Properly type this class
// Fake LocalStorage
class LocalStorageMock {
	store: { [key: string]: any } = {};
	constructor() {
		this.store = {};
	}

	clear() {
		this.store = {};
	}

	getItem(key: string) {
		return this.store[key] || null;
	}

	setItem(key: string, value: string) {
		this.store[key] = value.toString();
	}

	removeItem(key: string) {
		delete this.store[key];
	}
}

function makePaginationMocksFor(length: number) {
	return [
		{
			request: { query: PRODUCTS_COUNT_QUERY },
			result: {
				data: {
					_allProductsMeta: {
						count: length,
					},
					itemsConnection: {
						__typename: 'aggregate',
						aggregate: {
							count: length,
							__typename: 'count',
						},
					},
				},
			},
		},
	];
}

export {
	makePaginationMocksFor,
	LocalStorageMock,
	fakeItem,
	fakeUser,
	fakeCartItem,
	fakeOrder,
	fakeOrderItem,
};
