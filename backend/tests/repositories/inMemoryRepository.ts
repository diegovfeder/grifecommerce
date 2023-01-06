import { Product } from '../../schemas/Product';

export class InMemoryNotificationsRepository {
	products = [];

	async create(product: typeof Product) {
		this.products.push(product);
	}
}
