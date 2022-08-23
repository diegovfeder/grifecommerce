import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

// const MyOtherDocument = () => {
// 	return (
// 		<Html>
// 			<Head />
// 			<body>
// 				<Main />
// 				<NextScript />
// 			</body>
// 		</Html>
// 	);
// };

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		console.log('MyDocument, getInitialProps');
		console.log({ ctx });
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;
		console.log({ sheet, originalRenderPage });

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await Document.getInitialProps(ctx);
			console.log({ initialProps });

			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}

	render() {
		return (
			<Html lang="pt-BR">
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

// export { MyOtherDocument };
export default MyDocument;
