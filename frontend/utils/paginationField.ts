import { PRODUCTS_COUNT_QUERY } from '../gql/queries';

const paginationField = () => {
	return {
		keyArgs: false,
		// FIXME: Add proper types
		read(existing = [], { args, cache }: any) {
			const { take, skip } = args;
			const data = cache.readQuery({ query: PRODUCTS_COUNT_QUERY });
			const { productsCount } = data;
			const page = skip / take + 1;
			const pages = Math.ceil(productsCount / take);
			const items = existing.slice(skip, skip + take).filter(x => x);

			if (items.length && items.length !== take && page === pages) {
				return items;
			}
			if (items.length !== take) {
				return false;
			}
			if (items.length) {
				return items;
			}
			return false;
		},
		// FIXME: Add proper types
		merge(existing: any, incoming: any, { args }: any) {
			const { skip } = args;
			const merged = existing ? existing.slice(0) : [];
			for (let i = skip; i < skip + incoming.length; ++i) {
				merged[i] = incoming[i - skip];
			}
			return merged;
		},
	};
};

export default paginationField;
