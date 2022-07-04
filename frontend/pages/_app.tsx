import {
	ApolloClient,
	ApolloProvider,
	NormalizedCacheObject,
} from '@apollo/client';
import { NextComponentType, NextPage, NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import Page from '../components/PageComponent';
import CartStateProvider from '../providers/CartStateProvider';
import withData from '../utils/withData';
import NProgress from 'nprogress';
import '../components/styles/nprogress.css';
import React from 'react';

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

// withData has following type:
// (App: NextComponentType<NextPageContext>) => NextComponentType<NextPageContext>
// So, I'm passing MyApp as App
// ???

// This is myApp with Overriden getInitialProps
export default withData(MyApp);
