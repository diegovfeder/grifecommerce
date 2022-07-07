import React, { FunctionComponent } from 'react';
import {
	NextPage,
	NextComponentType,
	NextPageContext,
} from 'next';
import Router from 'next/router';
import {
	ApolloClient,
	ApolloProvider,
	NormalizedCacheObject,
} from '@apollo/client';
import NProgress from 'nprogress';
import withData from '../utils/withData';
import CartStateProvider from '../providers/CartStateProvider';
import Page from '../components/PageComponent';
import '../components/styles/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

interface MyAppProps {
	Component: any;
	pageProps: any;
	apollo: ApolloClient<NormalizedCacheObject>;
}

function MyApp({
	Component,
	pageProps,
	apollo,
}: MyAppProps &
	(React.ComponentClass<any, any> & {
		getInitialProps?(context: NextPageContext): any;
	}) &
	(FunctionComponent<any> & {
		getInitialProps?(context: NextPageContext): any;
	})) {
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

MyApp.getInitialProps = async function ({
	Component,
	ctx,
}: {
	Component: NextComponentType<NextPageContext>;
	ctx: NextPageContext;
}) {
	// TODO: Fix any
	let pageProps = {} as any;
	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
		console.log({ pageProps });
	}
	pageProps.query = ctx?.query || '';
	return { pageProps };
};

export default withData(MyApp as any);

// FIXME: What is the issue with Component?...
// TODO: Properly type pageProps, Component and ctx

// Here, we're overriding the default App component
// with our own getInitialProps function.
// this function is meant to get initialProps from the component,
// passing down a function
// and then rewriting pageProps.query with ctx.query??
// -- Here I'm initializing pageProps, trying to get from Component, passing down the context?..

// It seems that this is wanting to automate getInitialProps in the whole app
// Should I getInitialProps from the component?
// Should I getInitialProps from the app?

// withData has following type:
// (App: NextComponentType<NextPageContext>) => NextComponentType<NextPageContext>
// So, I'm passing MyApp as App
// ???

// This is myApp with Overriden getInitialProps
// withData(Page: typeof App | (React.ComponentClass<any, any> & {
// 	getInitialProps?(context: NextPageContext): any;
// }) | (React.FunctionComponent<any> & {
// 	...;
// }), pageOptions?: WithApolloOptions | undefined): {
// 	...;

// Type 'typeof MyApp' is not assignable to type 'FunctionComponent<any> & { getInitialProps?(context: NextPageContext): any; }'.
