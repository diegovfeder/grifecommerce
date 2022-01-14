import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
	return {
		keyArgs: false,
		read(existing = [], { args, cache }) {
			const { take, skip } = args;
			const data = cache.readQuery({ query: PAGINATION_QUERY });
			const { productsCount } = data;
			const page = skip / take + 1;
			const pages = Math.ceil(productsCount / take);
			const items = existing.slice(skip, skip + take).filter((x) => x);

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
		merge(existing, incoming, { args }) {
			const { skip } = args;
			const merged = existing ? existing.slice(0) : [];
			// eslint-disable-next-line no-plusplus
			for (let i = skip; i < skip + incoming.length; ++i) {
				merged[i] = incoming[i - skip];
			}
			return merged;
		},
	};
}
