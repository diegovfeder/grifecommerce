import DeleteProduct from 'components/DeleteProduct';

interface DeleteProductPageProps {
	query: {
		id?: string;
	};
}

// FIXME: Style this component, render product
// TODO: Create tests
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
