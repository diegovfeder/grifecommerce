import { ReactNode } from 'react';

export interface IRFC {
	children?: ReactNode;
}

export interface EventProps {
	preventDefault: () => void;
}

export interface SignInFormInputProps {
	email: string;
	password: string;
}

export interface SignUpFormInputProps extends SignInFormInputProps {
	name: string;
}

export interface RequestPasswordResetFormInputProps {
	email: string;
}

export interface RedeemPasswordResetFormInputProps
	extends SignInFormInputProps {
	token: string;
}

export interface ProductFormInputProps {
	name: string;
	description: string;
	price: number | undefined;
	image?: any;
}

export interface UserProps {
	id: string;
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

export interface CartItemProps {
	__typename?: string;
	id: string;
	product: ProductProps;
	quantity: number;
	user?: UserProps;
}
