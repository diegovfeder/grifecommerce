import 'styles/globals.css';
import type { AppProps } from 'next/app';
import PageComponent from '../components/PageComponent';
import Router from 'next/router';
import NProgress from 'nprogress';
// TODO: Swap with my own
// import '../components/styles/nprogress.css'
import 'nprogress/nprogress.css';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import withData from '../util/withData';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

interface IAppProps extends AppProps {
	apollo: ApolloClient<any>;
}

function MyApp({ Component, pageProps, apollo }: IAppProps) {
	return (
		<ApolloProvider client={apollo}>
			<PageComponent>
				<Component {...pageProps} />
			</PageComponent>
		</ApolloProvider>
	);
}

// TODO: remove any, properly type this
MyApp.getInitialProps = async function ({ Component, ctx }: any) {
	let pageProps = { query: undefined };
	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}
	pageProps.query = ctx.query;
	return { pageProps };
};

export default withData(MyApp);
