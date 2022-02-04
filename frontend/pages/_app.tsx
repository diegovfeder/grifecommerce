import { useEffect } from 'react';
import {
	ApolloClient,
	ApolloProvider,
	NormalizedCacheObject,
} from '@apollo/client';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Router, { useRouter } from 'next/router';
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
	const router = useRouter();

	// TODO: Install gtag to use the function below
	// GET A TRACKING ID, CREATE AT TAG MANAGER / GOOGLE ANALYTICS
	const handleRouteChange = (url: string) => {
		console.log(url);
		// 	window.gtag('config', '[Tracking ID]', {
		//     page_path: url,
		//   });
	};

	useEffect(() => {
		router.events.on('routeChangeComplete', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);

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
