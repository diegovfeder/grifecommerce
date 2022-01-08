import DeleteProduct from 'components/DeleteProduct';

interface DeleteProductPageProps {
	query: {
		id?: string;
	};
}

// TODO: Create tests
// FIXME: Style this component, render product
// TODO: Add roles: this path should be accessible from admin type user only.
const DeleteProductPage = ({ query }: DeleteProductPageProps) => {
	return (
		<>
			{<p>TODO: List all products?</p>}
			<DeleteProduct id={query.id}>
				Delete button with query.id undefined
			</DeleteProduct>
		</>
	);
};

export default DeleteProductPage;
