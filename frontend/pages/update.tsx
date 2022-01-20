import UpdateProduct from '../components/UpdateProduct';

// TODO: Properly type query
const UpdatePage = ({ query }: { query: any }) => {
	console.log(query);
	return (
		<div>
			<UpdateProduct id={query.id} />
		</div>
	);
};

export default UpdatePage;
