const OrderIndex = ({ orders }) => {
  const orderList = orders.map((order) => {
    return (
      <li key={order.id}>
        {order.ticket.title} - {order.status}
      </li>
    );
  });
  return <ul>{orderList}</ul>;
};

OrderIndex.getInitialProps = (context, client) => {
  const { data } = client.get("/orders");
  return {
    orders: data,
  };
};

export default OrderIndex;
