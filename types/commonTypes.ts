import { ReactNode } from 'react';

export interface IRFC {
	children?: ReactNode;
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
