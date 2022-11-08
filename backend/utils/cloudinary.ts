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
