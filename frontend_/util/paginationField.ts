import { PAGINATION_QUERY } from 'components/Pagination';

// First thing Apollo does is ask the read function for those items
// We can either do:
// 1. Return the items because they're already in cacche
// 2. Return a false from here, (network request)
const PaginationField = () => {
	return {
		keyArgs: false, // tells Apollo we'll take responsability for next actions
		read(existing = [], { args, cache }: any) {
			// console.log({ existing, args, cache });
			const { skip, first } = args;

			// Read the number of items on the page from the cache.
			const data = cache.readQuery({ query: PAGINATION_QUERY });
			const productsCount = data?.productsCount;
			const page = skip / first + 1;
			const pages = Math.ceil(productsCount / first);

			// Check if we have existing items
			const items = existing.slice(skip, skip + first).filter(x => x);

			// -- CONDITIONAL LOGIC --
			// IF (there are items),
			// AND (there aren't enough items to satisfy how many were requested),
			// AND (we are on the last page)
			// THEN just send it!
			if (items.length && items.length !== first && page === pages) {
				return items;
			}
			if (items.length !== first) {
				// We don't have any items, we must go to the network to fetch them.
				return false;
			}
			// if there are items, return them from the cache.
			if (items.length) {
				// console.log(
				// 	`There are ${items.length} items in the chache! Send them to Apollo!`,
				// );
				return items;
			}

			return false; // fallback to network
		},
		merge(existing: any, incoming: any, { args }: any) {
			const { skip } = args;
			// This runs when the Apollo client comes back from the network with our products
			// console.log(`Merging items from the network ${incoming.length}`);
			const merged = existing ? existing.slice(0) : [];
			for (let i = skip; i < skip + incoming.length; ++i) {
				merged[i] = incoming[i - skip];
			}
			// console.log(merged);
			// Finally we return the merged items from the cache,
			return merged;
		},
	};
};

export default PaginationField;
