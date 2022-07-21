export interface IUserModel {
	id: string;
}

export interface IProductModel {
	id: string;
	name: string;
	price: number;
	description: string;
	photo: {
		image: {
			publicUrlTransformed: string;
		};
	};
}

export interface ICartItemModel {
	id: string;
	quantity: number;
	productId: string;
	userId: string;
}
