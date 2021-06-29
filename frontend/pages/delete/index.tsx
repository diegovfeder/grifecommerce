import DeleteProduct from 'components/DeleteProduct';

interface IDeleteProductPage {
	query: any;
}

const DeleteProductPage = ({ query }: IDeleteProductPage) => {
	return <DeleteProduct id={query.id || undefined} />;
};

export default DeleteProductPage;
