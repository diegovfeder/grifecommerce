module.exports = {
	reactStrictMode: true,
	images: {
		domains: ['res.cloudinary.com'],
	},
	webpack: config => {
		config.module.rules.push({
			test: /\.(graphql|gql)$/,
			exclude: /node_modules/,
			loader: 'graphql-tag/loader',
		});
		return config;
	},
	// FIXME: What does this do?
	// webpackDevMiddleware: config => {
	// 	return config;
	// },
};
