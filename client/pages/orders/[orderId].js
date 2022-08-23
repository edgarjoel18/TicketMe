import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/useRequest";
import Router from "next/router";

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push("/orders"),
  });

  useEffect(() => {
    const getTimeRemaining = () => {
      const msSeconds = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msSeconds / 1000));
    };
    getTimeRemaining();
    const timerId = setInterval(getTimeRemaining, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order expired</div>;
  }

  return (
    <div>
      Time left to pay: {timeLeft}
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51JpIP3IhauiHyW48FwgjWQZDcYhubmZYWdjdekfe488IZFBYxDpjBaCGpswzxgmMeYZLleXbdgx4oPdYHfj7txHt00jzo8n3G5"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return {
    order: data,
  };
};

export default OrderShow;
