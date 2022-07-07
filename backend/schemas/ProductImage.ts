import "dotenv/config";
import { relationship, text } from "@keystone-6/core/fields";
import { list } from "@keystone-6/core";
import { cloudinaryImage } from "@keystone-6/cloudinary";

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } =
	process.env;

export const cloudinary = {
	cloudName: CLOUDINARY_CLOUD_NAME,
	apiKey: CLOUDINARY_KEY,
	apiSecret: CLOUDINARY_SECRET,
	folder: "grifecommerce",
};

export const ProductImage = list({
	fields: {
		image: cloudinaryImage({
			cloudinary,
			label: "Source",
		}),
		altText: text(),
		product: relationship({ ref: "Product.photo" }),
	},
	ui: {
		listView: {
			initialColumns: ["image", "altText", "product"],
		},
	},
});
