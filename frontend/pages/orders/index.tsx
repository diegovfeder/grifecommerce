import { useQuery } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';

import GET_ORDERS_QUERY from '../../gql/queryOrders.gql';
import formatMoney from '../../utils/formatMoney';
import { IItem, IOrder } from '../../types/commonTypes';
import { LoadingLabel } from '../../components/loading';
import { ErrorMessage } from '../../components/error';
import StyledCard from '../../components/styles/StyledCard';
import StyledListItem from '../../components/styles/StyledListItem';
import StyledUnorderedList from '../../components/styles/StyledUnorderedList';

function countItemsInAnOrder(order: IOrder) {
	return order.items.reduce(
		(tally: number, item: { quantity: number }) => tally + item.quantity,
		0,
	);
}

export default function OrdersPage() {
	const { data, error, loading } = useQuery(GET_ORDERS_QUERY);
	console.log({ data });
	const { allOrders } = data || [];

	if (loading) return <LoadingLabel />;

	if (error) return <ErrorMessage error={error} />;

	return (
		<div>
			<Head>
				<title>GRIFE | Your have {allOrders?.length || 0} orders</title>
			</Head>
			<div style={{ height: '200px' }}></div>
			<StyledCard>
				{allOrders?.length > 0 ? (
					<h2>You have {allOrders?.length} orders:</h2>
				) : (
					<h2>You haven't ordered any product yet...</h2>
				)}
				{/* TODO: Separate Order Item to its own component */}
				{/* TODO: Test / render order item / all orders in cards */}
				<StyledUnorderedList>
					{allOrders?.map((order: IOrder) => (
						<StyledListItem>
							<Link href={`/order/${order.id}`}>
								<a>
									<div className="order-meta">
										<p>{countItemsInAnOrder(order)} Items</p>
										<p>
											{order.items.length} Product
											{order.items.length === 1 ? '' : 's'}
										</p>
										<p>{formatMoney(order.total)}</p>
									</div>
									<div className="images">
										{order.items.map((item: IItem) => (
											<img
												key={`image-${item.id}`}
												src={item.photo?.image?.publicUrlTransformed}
												alt={item.name}
											/>
										))}
									</div>
								</a>
							</Link>
						</StyledListItem>
					))}
				</StyledUnorderedList>
			</StyledCard>
		</div>
	);
}
