import 'dotenv/config';
import { list } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';
import { cloudinaryImage } from '@keystone-6/cloudinary';

import { isSignedIn, permissions } from '../access';

const {
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET,
	CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_FOLDER,
} = process.env;

export const cloudinary = {
	apiKey: CLOUDINARY_API_KEY,
	apiSecret: CLOUDINARY_API_SECRET,
	cloudName: CLOUDINARY_CLOUD_NAME,
	folder: CLOUDINARY_FOLDER,
};

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
