import { useState } from "react";
import useRequest from "../../hooks/useRequest";
import Router from "next/router";

const NewTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: {
      title: title,
      price: price,
    },
    onSuccess: () => Router.push("/"),
  });
  const onBlur = () => {
    const value = parseFloat(price);
    if (NaN(value)) {
      return;
    }
    setPrice(value.toFixed(2));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doRequest();
  };

  return (
    <div>
      <h1>Create a ticket</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            className="form-control"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            onBlur={onBlur}
          />
        </div>
        {errors}
        <button className="btn btn-primary" style={{ marginTop: 10 }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewTicket;
