import { CURRENT_USER_QUERY } from '../hooks/useUserQuery';

const mockQueries = {
	currentUser: {
		request: {
			query: CURRENT_USER_QUERY,
			variables: {},
		},
		result: {
			data: {
				authenticatedItem: {
					id: '1',
					email: 'diego@test.com',
					name: 'Diego Test',
					cart: {
						id: '1',
						quantity: '1',
						product: {
							id: '1',
							price: '200',
							name: 'Sample Pack #01',
							description: 'This is a sample pack',
							photo: {
								image: {
									publicUrlTransformed: 'https://via.placeholder.com/300x300',
								},
							},
						},
					},
				},
			},
		},
	},
};

export default mockQueries;
