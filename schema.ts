import { createSchema } from '@keystone-next/keystone/schema';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
// export { extendGraphqlSchema } from './schema/mutations';

export const lists = createSchema({
  User,
  Product,
  ProductImage,
});
