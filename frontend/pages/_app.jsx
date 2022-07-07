import React from 'react';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';
import NProgress from 'nprogress';
import withData from '../utils/withData';
import CartStateProvider from '../providers/CartStateProvider';
import Page from '../components/PageComponent';
import '../components/styles/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
	return (
		<ApolloProvider client={apollo}>
			<CartStateProvider>
				<Page>
					<Component {...pageProps} />
				</Page>
			</CartStateProvider>
		</ApolloProvider>
	);
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
	let pageProps = {};
	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
		console.log({ pageProps });
	}
	pageProps.query = ctx?.query || '';
	return { pageProps };
};

export default withData(MyApp);
