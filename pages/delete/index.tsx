import DeleteProduct from 'components/DeleteProduct';

// TODO: Is there a defined / expected type for query?
interface IDeleteProductPage {
	query: any;
}

// FIXME: Is this being used?
const DeleteProductPage = ({ query }: IDeleteProductPage) => {
	return (
		<>
			{<p>TODO: List all products?</p>}
			<DeleteProduct id={query.id || undefined}>
				Delete button with query.id undefined
			</DeleteProduct>
		</>
	);
};

export default DeleteProductPage;
