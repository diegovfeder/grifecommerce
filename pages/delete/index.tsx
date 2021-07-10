import DeleteProduct from 'components/DeleteProduct';

// TODO: Is there a defined / expected type for query?
interface IDeleteProductPage {
	query: any;
}

// FIXME: Is this being used?
const DeleteProductPage = ({ query }: IDeleteProductPage) => {
	return <DeleteProduct id={query.id || undefined} />;
};

export default DeleteProductPage;
