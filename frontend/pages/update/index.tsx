import UpdateProduct from 'components/UpdateProduct';

interface IUpdateProductPage {
	query: any;
}

const UpdateProductPage = ({ query }: IUpdateProductPage) => {
	return (
		<>
			<UpdateProduct id={query.id} />
		</>
	);
};

export default UpdateProductPage;
