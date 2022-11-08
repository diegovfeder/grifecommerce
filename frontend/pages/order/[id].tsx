import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';

import ErrorMessage from '../../components/error/ErrorMessage';
import StyledOrder from '../../components/styles/StyledOrder';
import formatMoney from '../../utils/formatMoney';
import { IOrderItem } from '../../@types/commonTypes';

interface ISingleOrderPage {
	query: {
		id: string;
	};
}

const SINGLE_ORDER_QUERY = gql`
	query SINGLE_ORDER_QUERY($id: ID!) {
		order: Order(where: { id: $id }) {
			id
			charge
			total
			user {
				id
			}
			items {
				id
				name
				description
				price
				quantity
				photo {
					image {
						publicUrlTransformed
					}
				}
			}
		}
	}
`;

export default function SingleOrderPage({
	query,
}: ISingleOrderPage): JSX.Element {
	const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
		variables: { id: query.id },
	});
	const { order } = data || {};

	if (loading) return <p>Loading...</p>;
	if (error) return <ErrorMessage error={error} />;

	return (
		<StyledOrder>
			<Head>
				<title>GRIFE - {order.id}</title>
			</Head>
			<p>
				<span>Order Id:</span>
				<span>{order.id}</span>
			</p>
			<p>
				<span>Charge:</span>
				<span>{order.charge}</span>
			</p>
			<p>
				<span>Order Total:</span>
				<span>{formatMoney(order.total)}</span>
			</p>
			<p>
				<span>ItemCount:</span>
				<span>{order.items.length}</span>
			</p>
			<div className="items">
				{order.items.map((item: IOrderItem) => (
					<div className="order-item" key={item.id}>
						<img src={item.photo.image.publicUrlTransformed} alt={item.title} />
						<div className="item-details">
							<h2>{item.name}</h2>
							<p>Qty: {item.quantity}</p>
							<p>Each: {formatMoney(item.price)}</p>
							<p>Sub Total: {formatMoney(item?.price * item?.quantity)}</p>
							<p>{item.description}</p>
						</div>
					</div>
				))}
			</div>
		</StyledOrder>
	);
}
