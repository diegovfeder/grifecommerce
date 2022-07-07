import Document, {
	Html,
	Head,
	NextScript,
	Main,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await Document.getInitialProps(ctx);
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
<<<<<<< HEAD:frontend/pages/_document.tsx
				<Head>
					<script
						async
						src="https://www.googletagmanager.com/gtag/js?id=[Tracking ID]"
					/>

					<script
						dangerouslySetInnerHTML={{
							__html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '[Tracking ID]', { page_path: window.location.pathname });
            `,
						}}
					/>
				</Head>
=======
				<Head />
>>>>>>> dev:frontend/pages/_document.jsx
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
