import DeleteProduct from 'components/DeleteProduct';

interface IDeleteProductPage {
	query: {
		id?: string;
	};
}

// TODO: Add roles: this path should be accessible from admin type user only.
const DeleteProductPage = ({ query }: IDeleteProductPage) => {
	return (
		<>
			{<p>TODO: Delete specific product...</p>}
			<DeleteProduct id={query.id}>
				Delete button with query.id undefined
			</DeleteProduct>
		</>
	);
};

export default DeleteProductPage;
