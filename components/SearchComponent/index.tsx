import React from 'react';
import { DropDown, DropDownItem, StyledSearch } from './styles';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/client';
import debounce from 'lodash.debounce';
import Image from 'next/image';
import { useRouter } from 'next/router';

const SEARCH_PRODUCTS_QUERY = gql`
	query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
		searchTerms: allProducts(
			where: {
				OR: [{ name_contains_i: $searchTerm }, { description_i: $searchTerm }]
			}
		) {
			id
			name
			photo {
				id
				image {
					publicUrlTransformed
				}
			}
		}
	}
`;

const Search = () => {
	const router = useRouter();

	const [findItems, { data, loading, error }] = useLazyQuery(
		SEARCH_PRODUCTS_QUERY,
		{ fetchPolicy: 'no-cache' },
	);
	const items = data?.searchTerms || [];
	const findItemsWithDebounce = debounce(findItems, 350);

	resetIdCounter();
	// FIXME:
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
			findItemsWithDebounce({
				variables: {
					searchTerm: inputValue,
				},
			});
		},
		onSelectedItemChange({ selectedItem }: any) {
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
					type="search"
				/>
			</div>
			<DropDown {...getMenuProps()}>
				{isOpen &&
					items.map((item: any, index: number) => (
						<DropDownItem
							key={item?.id}
							{...getItemProps({ item })}
							highlighted={index === highlightedIndex}
						>
							<Image
								src={item?.photo?.image?.publicUrlTransformed}
								alt={item?.name}
								width={50}
								height={50}
							/>
							{item?.name}
						</DropDownItem>
					))}
				{isOpen && !items?.length && !loading && (
					<DropDownItem>Sorry, No items found for {inputValue}</DropDownItem>
				)}
			</DropDown>
		</StyledSearch>
	);
};

export default Search;
