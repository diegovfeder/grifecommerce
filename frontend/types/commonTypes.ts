import { ReactNode } from 'react';

export interface IRFC {
	children?: ReactNode;
}

// TODO: Import auto generated types from Prisma | Keystone
export interface IUserModel {}

export interface IProductModel {
	name: string;
	price: number;
	photo: {
		image: {
			publicUrlTransformed: string;
		};
	};
}

export interface IEvent {
	preventDefault: () => void;
}

export interface ISignInFormInput {
	email: string;
	password: string;
}

export interface ISignUpFormInput extends ISignInFormInput {
	name: string;
}

export interface IRequestPasswordResetFormInput {
	email: string;
}

export interface IRedeemPasswordResetFormInput extends ISignInFormInput {
	token: string;
}

export interface IProductFormInput {
	name: string;
	description: string;
	price: number | undefined;
	image?: any;
}

export interface ProductProps {
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

export interface UserProps {
	id: string;
}

export interface CartItemProps {
	__typename?: string;
	id: string;
	product: ProductProps;
	quantity: number;
	user?: UserProps
}
