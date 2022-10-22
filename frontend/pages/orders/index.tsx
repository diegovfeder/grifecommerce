import { useQuery } from '@apollo/client';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';

import ErrorMessage from '../../components/error/ErrorMessage';
import formatMoney from '../../utils/formatMoney';
import StyledOrderItem from '../../components/styles/StyledOrderItem';
import GET_ORDERS_QUERY from '../../gql/queryOrders.gql';
import { IItem, IOrder } from '../../types/commonTypes';
import { LoadingLabel } from '../../components/loading';

// TODO: Create Orders model in keystone
const OrderUl = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	grid-gap: 4rem;
`;

function countItemsInAnOrder(order: IOrder) {
	return order.items.reduce(
		(tally: number, item: { quantity: number }) => tally + item.quantity,
		0,
	);
}

export default function OrdersPage() {
	const { data, error, loading } = useQuery(GET_ORDERS_QUERY);
	const { allOrders } = data || [];

	if (loading) return <LoadingLabel />;

	if (error) return <ErrorMessage error={error} />;

	return (
		<div>
			<Head>
				<title>Your Orders ({allOrders?.length})</title>
			</Head>
			{/* TODO: Style this page header */}
			{/* Create a PageHeader component */}
			{allOrders?.length > 0 ? (
				<h2>You have {allOrders?.length} orders!</h2>
			) : (
				<h2>You have no orders!</h2>
			)}
			{/* TODO: Separate Order Item to its own component */}
			<OrderUl>
				{allOrders?.map((order: IOrder) => (
					<StyledOrderItem>
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
					</StyledOrderItem>
				))}
			</OrderUl>
		</div>
	);
}
