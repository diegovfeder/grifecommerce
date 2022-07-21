module.exports = {
	reactStrictMode: true,
	images: {
		domains: ['res.cloudinary.com'],
	},
	swcMinify: false,
	env: {
		GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
		STRIPE_PUBLISHABLE: process.env.STRIPE_PUBLISHABLE,
	},
	webpack: (config, { webpack }) => {
		config.module.rules.push({
			test: /\.(graphql|gql)$/,
			exclude: /node_modules/,
			loader: 'graphql-tag/loader',
		});
		config.plugins.push(new webpack.IgnorePlugin(/\/__test__\//));
		return config;
	},
};
