import { useRouter } from 'next/dist/client/router';
import { useLazyQuery, gql } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import debounce from 'lodash.debounce';

import { SEARCH_PRODUCTS_QUERY } from '../gql/queries';
import { ProductProps } from '../@types/commonTypes';
import {
	StyledDropDown,
	StyledDropDownItem,
	StyledSearch,
} from './styles/StyledSearch';

interface ISelectedItem {
	id: string;
}

interface IItem {
	name: string;
}

// TODO: searchTerm shouldn't care about letter case (upper or lower)
// TODO: Properly type any's
const SearchComponent = () => {
	const router = useRouter();

	const [findItems, { loading, data }] = useLazyQuery(SEARCH_PRODUCTS_QUERY, {
		fetchPolicy: 'no-cache',
	});

	const items = data?.searchTerms || [];
	const findItemsButChill = debounce(findItems, 350);

	resetIdCounter();

	const {
		isOpen,
		inputValue,
		getMenuProps,
		getInputProps,
		getComboboxProps,
		getItemProps,
		highlightedIndex,
	} = useCombobox({
		items,
		onInputValueChange() {
			findItemsButChill({
				variables: {
					searchTerm: inputValue,
				},
			});
		},
		// FIXME: Properly type this
		onSelectedItemChange({ selectedItem }: any) {
			// FIXME: Can we create ui test for this route action?
			router.push({
				pathname: `/product/${selectedItem?.id}`,
			});
		},
		itemToString({ item }: any) {
			return item?.name || '';
		},
	});

	return (
		<StyledSearch>
			<div {...getComboboxProps()}>
				<input
					{...getInputProps({
						type: 'search',
						placeholder: 'Search for an Item',
						id: 'search',
						className: loading ? 'loading' : undefined,
					})}
				/>
			</div>
			<StyledDropDown {...getMenuProps()}>
				{isOpen &&
					items.map((item: ProductProps, index: number) => (
						<StyledDropDownItem
							{...getItemProps({ item, index })}
							key={item.id}
							highlighted={index === highlightedIndex}
						>
							{!!item?.photo?.image?.publicUrlTransformed && (
								<img
									src={item?.photo?.image?.publicUrlTransformed}
									alt={item.name}
									width="50"
								/>
							)}
							{item.name}
						</StyledDropDownItem>
					))}
				{isOpen && !items.length && !loading && (
					<StyledDropDown>
						Sorry, No items found for {inputValue}
					</StyledDropDown>
				)}
			</StyledDropDown>
		</StyledSearch>
	);
};

export default SearchComponent;
