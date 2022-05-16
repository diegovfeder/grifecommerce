import EditProduct from '../../components/EditProduct';

const EditProductPage = ({ query }: { query: { id: string } }) => {
	return (
		<div>
			<EditProduct id={query.id} />
		</div>
	);
};

export default EditProductPage;
