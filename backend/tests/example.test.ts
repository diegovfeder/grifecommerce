import {
	setupTestEnv,
	setupTestRunner,
	TestEnv,
} from '@keystone-6/core/testing';
import config from '../keystone';

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
	        { name: 'Diego', email: 'diego@grifemusic.com', password: 'super-secret' },
	        { name: 'Dan', email: 'dan@grifemusic.com', password: 'super-secret' },
	      ],
	      query: 'id name',
	    });
	    expect(diego.name).toEqual('Diego');
	    expect(dan.name).toEqual('Dan');

	    // Create a task assigned to Diego
	    // const task = await context.query.Task.createOne({
	    //   data: {
	    //     label: 'Experiment with Keystone',
	    //     priority: 'high',
	    //     isComplete: false,
	    //     assignedTo: { connect: { id: diego.id } },
	    //   },
	    //   query: 'id label priority isComplete assignedTo { name }',
	    // });
	    // expect(task.label).toEqual('Experiment with Keystone');
	    // expect(task.priority).toEqual('high');
	    // expect(task.isComplete).toEqual(false);
	    // expect(task.assignedTo.name).toEqual('Diego');

	    // Check that we can't update the task (not logged in)
	    // {
	    //   const { data, errors } = await context.graphql.raw({
	    //     query: `mutation update($id: ID!) {
	    //       updateTask(where: { id: $id }, data: { isComplete: true }) {
	    //         id
	    //       }
	    //     }`,
	    //     variables: { id: task.id },
	    //   });
	    //   expect(data!.updateTask).toBe(null);
	    //   expect(errors).toHaveLength(1);
	    //   expect(errors![0].path).toEqual(['updateTask']);
	    //   expect(errors![0].message).toEqual(
	    //     `Access denied: You cannot perform the 'update' operation on the item '{"id":"${task.id}"}'. It may not exist.`
	    //   );
	    // }

	    // {
	    //   // Check that we can update the task when logged in as Diego
	    //   const { data, errors } = await context
	    //     .withSession({ itemId: diego.id, data: {} })
	    //     .graphql.raw({
	    //       query: `mutation update($id: ID!) {
	    //         updateTask(where: { id: $id }, data: { isComplete: true }) {
	    //           id
	    //         }
	    //       }`,
	    //       variables: { id: task.id },
	    //     });
	    //   expect(data!.updateTask.id).toEqual(task.id);
	    //   expect(errors).toBe(undefined);
	    // }

	    // Check that we can't update the task when logged in as Bob
	    // {
	    //   const { data, errors } = await context
	    //     .withSession({ itemId: dan.id, data: {} })
	    //     .graphql.raw({
	    //       query: `mutation update($id: ID!) {
	    //         updateTask(where: { id: $id }, data: { isComplete: true }) {
	    //           id
	    //         }
	    //       }`,
	    //       variables: { id: task.id },
	    //     });
	    //   expect(data!.updateTask).toBe(null);
	    //   expect(errors).toHaveLength(1);
	    //   expect(errors![0].path).toEqual(['updateTask']);
	    //   expect(errors![0].message).toEqual(
	    //     `Access denied: You cannot perform the 'update' operation on the item '{"id":"${task.id}"}'. It may not exist.`
	    //   );
	    // }
	  })
	);
});
