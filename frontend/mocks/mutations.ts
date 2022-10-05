import DELETE_PRODUCT_MUTATION from '../gql/deleteProductMutation.gql';
import ADD_TO_CART_MUTATION from '../gql/addToCartMutation.gql';

const mockedMutations = {
	addToCart: {
		request: {
			query: ADD_TO_CART_MUTATION,
			variables: {
				id: '1',
			},
		},
		result: {
			data: {
				addToCart: {
					id: '1',
				},
			},
		},
	},
	deleteProduct: {
		request: {
			query: DELETE_PRODUCT_MUTATION,
			variables: {
				id: '1',
			},
		},
		result: {
			data: {
				deleteProduct: {
					id: '1',
					name: 'Sample Pack #01',
				},
			},
		},
	},
	signUp: {
		// TODO:
	},
};

export default mockedMutations;
