import {
	setupTestEnv,
	setupTestRunner,
	TestEnv,
} from '@keystone-6/core/testing';

import config from '../keystone';
import { Product } from '../schemas/Product';

// Setup a test runner which will provide a clean test environment
// with access to our GraphQL API for each test.
const runner = setupTestRunner({ config });

describe('Example tests using test runner', () => {
	test(
		'Create a Person using the Query API',
		runner(async ({ context }) => {
			// We can use the context argument provided by the test runner to access
			// the full context API.
			const person = await context.query.User.createOne({
				data: {
					name: 'Diego',
					email: 'diego@grifemusic.com',
					password: 'super-secret',
				},
				query: 'id name email password { isSet }',
			});
			expect(person.name).toEqual('Diego');
			expect(person.email).toEqual('diego@grifemusic.com');
			expect(person.password.isSet).toEqual(true);
		}),
	);

	test(
		'Check that trying to create user with no name (required field) fails',
		runner(async ({ context }) => {
			// The context.graphql.raw API is useful when we expect to recieve an
			// error from an operation.
			const { data, errors } = await context.graphql.raw({
				query: `mutation {
	        createUser(data: { email: "user@grifemusic.com", password: "super-secret" }) {
	          id name email password { isSet }
	        }
	      }`,
			});
			expect(data!.createUser).toBe(null);
			expect(errors.length).toStrictEqual(1);
			expect(errors![0].path).toEqual(['createUser']);
			expect(errors![0].message).toEqual(
				'You provided invalid data for this operation.\n  - User.name: Name must not be empty',
			);
		}),
	);

	test(
		'Check access control by running updateTask as a specific user via context.withSession()',
		runner(async ({ context }) => {
			// We can modify the value of context.session via context.withSession() to masquerade
			// as different logged in users. This allows us to test that our access control rules
			// are behaving as expected.

			// Create some users
			const [diego, dan] = await context.query.User.createMany({
				data: [
					{
						name: 'Diego',
						email: 'diego@grifemusic.com',
						password: 'super-secret',
					},
					{
						name: 'Dan',
						email: 'dan@grifemusic.com',
						password: 'super-secret',
					},
				],
				query: 'id name',
			});
			expect(diego.name).toEqual('Diego');
			expect(dan.name).toEqual('Dan');

			// TODO: Create ProductImage
			const productImage = await context.query.ProductImage.createOne({
				data: {
					image: {},
					altText: 'Sample Pack',
					product: ,
				},
			});

			// TODO: Create an order instead of orderItem,?
			// const order = await context.query.Order.createOne({
			// 	data: {
			// 		total: 0,
			// 		user: diego,
			// 		userId: diego.id,
			// 		charge: '',
			// 	},
			// });

			// Create an orderItem referenced to Diego
			const orderItem = await context.query.OrderItem.createOne({
				data: {
					name: 'An order item',
					description: 'some description for this item',
					price: 1000,
					quantity: 5,
					order: 'some-order-id',
					photo: 'some-product-image-id',
				},
				query: 'id name description price quantity order photo',
			});
			expect(orderItem.name).toEqual('An order item');
			expect(orderItem.description).toEqual('some description for this item');
			expect(orderItem.price).toEqual(1000);
			expect(orderItem.quantity).toEqual(5);
			expect(orderItem.order).toEqual('some-order-id');
			expect(orderItem.photo).toEqual('some-product-image-id');

			// Check that we can't update the orderItem (not logged in)
			// {
			// 	const { data, errors } = await context.graphql.raw({
			// 		query: `mutation update($id: ID!) {
			// 			updateOrderItem(where: { id: $id }, data: { quantity: 1 }) {
			// 				id
			//       }
			//     }`,
			// 		variables: { id: orderItem.id },
			// 	});
			// 	expect(data!.updateOrderItem).toBe(null);
			// 	expect(errors).toHaveLength(1);
			// 	expect(errors![0].path).toEqual(['updateOrderItem']);
			// 	expect(errors![0].message).toEqual(
			// 		`Access denied: You cannot perform the 'update' operation on the item '{"id":"${orderItem.id}"}'. It may not exist.`,
			// 	);
			// }

			//   // Check that we can update the task when logged in as Diego
			// {
			// 	const { data, errors } = await context
			// 		.withSession({ itemId: diego.id, data: {} })
			// 		.graphql.raw({
			// 			query: `mutation update($id: ID!) {
			// 			updateOrderItem(where: { id: $id }, data: { quantity: 1 }) {
			// 				id
			// 			}
			// 		}`,
			// 			variables: { id: orderItem.id },
			// 		});
			// 	expect(data!.updateTask.id).toEqual(orderItem.id);
			// 	expect(errors).toBe(undefined);
			// }

			// Check that we can't update the task when logged in as Bob
			// {
			// 	const { data, errors } = await context
			// 		.withSession({ itemId: dan.id, data: {} })
			// 		.graphql.raw({
			// 			query: `mutation update($id: ID!) {
			//         updateOrderItem(where: { id: $id }, data: { quantity: 1 }) {
			//           id
			//         }
			//       }`,
			// 			variables: { id: orderItem.id },
			// 		});
			// 	expect(data!.updateOrderItem).toBe(null);
			// 	expect(errors).toHaveLength(1);
			// 	expect(errors![0].path).toEqual(['updateOrderItem']);
			// 	expect(errors![0].message).toEqual(
			// 		`Access denied: You cannot perform the 'update' operation on the item '{"id":"${orderItem.id}"}'. It may not exist.`,
			// 	);
			// }
		}),
	);
});
