import type { ListSchemaConfig } from '@keystone-6/core/types';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { CartItem } from './schemas/CartItem';
import { Role } from './schemas/Role';

export const lists = {
	User,
	Product,
	ProductImage,
	CartItem,
	Role,
} as ListSchemaConfig;
