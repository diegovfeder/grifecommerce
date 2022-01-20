import {
	ApolloClient,
	ApolloProvider,
	NormalizedCacheObject,
} from '@apollo/client';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import Page from '../components/PageComponent';
import CartStateProvider from '../providers/CartStateProvider';
import withData from '../utils/withData';
import NProgress from 'nprogress';
import '../components/styles/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

interface MyAppProps extends AppProps {
	apollo: ApolloClient<NormalizedCacheObject>;
	Component: NextPage;
	pageProps: any;
}

function MyApp({ Component, pageProps, apollo }: MyAppProps) {
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

// TODO: Properly type pageProps, Component and ctx
MyApp.getInitialProps = async function ({ Component, ctx }: any) {
	let pageProps = {};
	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}
	pageProps.query = ctx.query;
	return { pageProps };
};

export default withData(MyApp);
