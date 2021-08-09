import { ReactNode } from 'react';

export interface IRFC {
	children?: ReactNode;
}

// fromModel...
// Q: Can I import some auto-generated typescript interface (model) from prisma or keystone?
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
