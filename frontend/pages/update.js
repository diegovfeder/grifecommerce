import UpdateProduct from '../components/UpdateProduct';

// eslint-disable-next-line react/prop-types
export default function UpdatePage({ query }) {
	console.log(query);
	return (
		<div>
			<UpdateProduct id={query.id} />
		</div>
	);
}
