// TODO:
import DeleteProduct from 'components/DeleteProduct';

// TODO: Is there a defined / expected type for query?
interface IDeleteProductPage {
	query: any;
}

// FIXME: Is this being used?
// I don't think it is... or will be...
// -- anyway need to add amin rights for this path
const DeleteProductPage = ({ query }: IDeleteProductPage) => {
	return (
		<>
			{<p>TODO: Delete specific product...</p>}
			<DeleteProduct id={query.id || undefined}>
				Delete button with query.id undefined
			</DeleteProduct>
		</>
	);
};

export default DeleteProductPage;
