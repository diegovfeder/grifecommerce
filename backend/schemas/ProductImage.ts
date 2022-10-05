import 'dotenv/config';
import { list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';
import { cloudinaryImage } from '@keystone-6/cloudinary';

import { isSignedIn, permissions } from '../access';

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } =
	process.env;

export const cloudinary = {
	cloudName: CLOUDINARY_CLOUD_NAME,
	apiKey: CLOUDINARY_KEY,
	apiSecret: CLOUDINARY_SECRET,
	folder: 'grifecommerce',
};

// TODO: Test this accessControl
export const ProductImage = list({
	access: {
		operation: {
			create: isSignedIn,
			query: () => true,
			update: permissions.canManageProducts,
			delete: permissions.canManageProducts,
		},
	},
	fields: {
		image: cloudinaryImage({
			cloudinary,
			label: 'Source',
		}),
		altText: text(),
		product: relationship({ ref: 'Product.photo' }),
	},
	ui: {
		listView: {
			initialColumns: ['image', 'altText', 'product'],
		},
	},
});
