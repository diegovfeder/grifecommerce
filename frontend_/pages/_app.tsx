import type { AppProps } from 'next/app';
import { NextPage, NextPageContext } from 'next';
import Router from 'next/router';
import {
	ApolloClient,
	ApolloProvider,
	NormalizedCacheObject,
} from '@apollo/client';
import { CartStateProvider } from 'providers/cartState';
import PageComponent from '../components/PageComponent';
import StyledAppContainer from '../components/styled/StyledAppContainer';
import withData from '../util/withData';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import 'styles/customNProgress.css';
import 'styles/globals.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// TODO: FIX TYPES
interface MyAppProps extends AppProps {
	apollo: ApolloClient<NormalizedCacheObject>;
	Component: NextPage;
	pageProps: any;
}

// interface GetInitialProps {
// 	Component: any;
// 	ctx: any;
// }
// interface Context extends NextPageContext {
//   // any modifications to the default context, e.g. query types
// }

function MyApp({ Component, pageProps, apollo }: MyAppProps) {
	return (
		<StyledAppContainer>
			<ApolloProvider client={apollo}>
				<CartStateProvider>
					<PageComponent>
						<Component {...pageProps} />
					</PageComponent>
				</CartStateProvider>
			</ApolloProvider>
		</StyledAppContainer>
	);
}

MyApp.getInitialProps = async function ({ Component, ctx }: any) {
	let pageProps = { query: undefined };
	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}
	pageProps.query = ctx.query;
	return { pageProps };
};

export default withData(MyApp);
