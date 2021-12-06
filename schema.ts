import { createSchema } from '@keystone-next/keystone/schema';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { CartItem } from './schemas/CartItem';
import { Role } from './schemas/Role';


export const lists = createSchema({
	User,
	Product,
	ProductImage,
	CartItem,
	Role,
});
