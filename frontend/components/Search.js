import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/dist/client/router';
import { StyledDropDown, StyledDropDownItem, StyledSearch } from './styles/StyledSearch';

const SEARCH_PRODUCTS_QUERY = gql`
	query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
		searchTerms: products(
			where: {
				OR: [
					{ name: { contains: $searchTerm } }
					{ description: { contains: $searchTerm } }
				]
			}
		) {
			id
			name
			photo {
				image {
					publicUrlTransformed
				}
			}
		}
	}
`;

export default function Search() {
	const router = useRouter();
	const [findItems, { loading, data, error }] = useLazyQuery(
		SEARCH_PRODUCTS_QUERY,
		{
			fetchPolicy: 'no-cache',
		}
	);
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
		onSelectedItemChange({ selectedItem }) {
			router.push({
				pathname: `/product/${selectedItem.id}`,
			});
		},
		itemToString: (item) => item?.name || '',
	});
	return (
		<StyledSearch>
			<div {...getComboboxProps()}>
				<input
					{...getInputProps({
						type: 'search',
						placeholder: 'Search for an Item',
						id: 'search',
						className: loading ? 'loading' : null,
					})}
				/>
			</div>
			<StyledDropDown {...getMenuProps()}>
				{isOpen &&
					items.map((item, index) => (
						<StyledDropDownItem
							{...getItemProps({ item, index })}
							key={item.id}
							highlighted={index === highlightedIndex}
						>
							<img
								src={item.photo.image.publicUrlTransformed}
								alt={item.name}
								width="50"
							/>
							{item.name}
						</StyledDropDownItem>
					))}
				{isOpen && !items.length && !loading && (
					<StyledDropDownItem>Sorry, No items found for {inputValue}</StyledDropDownItem>
				)}
			</StyledDropDown>
		</StyledSearch>
	);
}
