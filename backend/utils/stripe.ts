import Stripe from 'stripe';

const { STRIPE_SECRET } = process.env;
console.log({ STRIPE_SECRET });

const stripeConfig = new Stripe(STRIPE_SECRET || '', {
	apiVersion: '2020-08-27',
});

export default stripeConfig;
