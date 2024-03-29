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

// TODO: Refactor getInitialProps to getStaticProps and getServerSideProps
MyApp.getInitialProps = async function ({ Component, ctx }) {
	console.log('MyApp, getInitialProps');
	let pageProps = {};
	if (!!Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}
	console.log({ pageProps });
	console.log({ ctx });
	pageProps.query = ctx?.query || {};
	return { pageProps };
};

export default withData(MyApp);
