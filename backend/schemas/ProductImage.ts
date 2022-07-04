import "dotenv/config";
import { relationship, text } from "@keystone-6/core/fields";
import { list } from "@keystone-6/core";
import { cloudinaryImage } from "@keystone-6/cloudinary";

// TODO: Add your own Cloudinary Cloud Name and API Key to vercel backend envs.
export const cloudinary = {
	cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
	apiKey: process.env.CLOUDINARY_KEY || "",
	apiSecret: process.env.CLOUDINARY_SECRET || "",
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
