import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import ErrorMessage from '../../components/ErrorMessage';
import formatMoney from '../../utils/formatMoney';
import StyledOrderItem from '../../components/styles/StyledOrderItem';

// TODO: Create Orders model in keystone
const USER_ORDERS_QUERY = gql`
	query USER_ORDERS_QUERY {
		orders {
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

const OrderUl = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	grid-gap: 4rem;
`;

function countItemsInAnOrder(order) {
	return order.items.reduce((tally, item) => tally + item.quantity, 0);
}

export default function OrdersPage() {
	const { data, error, loading } = useQuery(USER_ORDERS_QUERY);
	if (loading) return <p>Loading...</p>;
	if (error) return <ErrorMessage error={error} />;
	const { allOrders } = data;
	return (
		<div>
			<Head>
				<title>Your Orders ({allOrders?.length})</title>
			</Head>
			{allOrders?.length > 0 ? (
				<h2>You have {allOrders?.length} orders!</h2>
			) : (
				<h2>You have no orders!</h2>
			)}
			<OrderUl>
				{allOrders?.map(order => (
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
									{order.items.map(item => (
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
