import 'styles/globals.css';
import type { AppProps } from 'next/app';
import PageComponent from '../components/PageComponent';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import 'styles/customNProgress.css';
import {
	ApolloClient,
	ApolloProvider,
	NormalizedCacheObject,
} from '@apollo/client';
import withData from '../util/withData';
import { CartStateProvider } from 'providers/cartState';
import StyledAppContainer from '../components/styled/StyledAppContainer';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

interface MyAppProps extends AppProps {
	apollo: ApolloClient<NormalizedCacheObject>;
}

// TODO: Remove any, properly type this
interface GetInitialProps {
	Component: any;
	ctx: any;
}

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

MyApp.getInitialProps = async function ({ Component, ctx }: GetInitialProps) {
	let pageProps = { query: undefined };
	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}
	pageProps.query = ctx.query;
	return { pageProps };
};

export default withData(MyApp);
