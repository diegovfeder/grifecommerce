import UpdateProductComponent from '../../components/UpdateProductComponent';

// update-product?id=718b7ac6-7cf1-47e7-b1de-c4a13ca92f2d
interface IUpdateProductPage {
	query: {
		id: string;
	};
}

const UpdateProductPage = ({ query }: IUpdateProductPage) => {
	return (
		<div>
			<UpdateProductComponent id={query.id} />
		</div>
	);
};

export default UpdateProductPage;
