module.exports = {
	reactStrictMode: true,
	images: {
		domains: ['res.cloudinary.com'],
	},
	swcMinify: false,
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
