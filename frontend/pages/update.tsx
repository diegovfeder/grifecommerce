import UpdateProduct from '../components/UpdateProduct';

const UpdatePage = ({ query }: { query: { id: string } }) => {
	return (
		<div>
			<UpdateProduct id={query.id} />
		</div>
	);
};

export default UpdatePage;
