import { ReactNode } from 'react';

export interface IRFC {
	children?: ReactNode;
}

export interface IEvent {
	preventDefault: () => void;
}