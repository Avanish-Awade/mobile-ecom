import React, { useEffect, useState } from "react";
import styles from "./orderCard.module.css";

const OrderProduct = ({ product }) => {
  const calculateCost = () => {
    const cost = product.price * product.quantity;
    return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className={styles["product"]}>
      <img className={styles["image"]} src={product.image} alt={product.name} />
      <div className={styles["text"]}>
        <div className={styles["name"]}>
          {product.name}
        </div>
        <div className={styles["cost"]}>
          Rs.
          {product.price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} x {product.quantity} = Rs.
          {calculateCost()}
        </div>
      </div>
    </div>
  );
};

const OrderCard = ({ order }) => {
  const getDate = () => {
    const timeStamp = order.timeStamp.toString();
    let date = timeStamp.slice(0, 8);
    let time = timeStamp.slice(8, 14);

    date = `${date.slice(6, 8)}-${date.slice(4, 6)}-${date.slice(0, 4)}`;
    time = `${time.slice(0, 2)}:${time.slice(2, 4)}:${time.slice(4, 6)} GMT`;

    return [date, time];
  };

  return (
    <div className={styles["order-card"]}>
      <div className={styles["order-id"]}>
        <b>
          ID: {order.orderId}
        </b>
      </div>
      {order.products.map((product, index) =>
        <OrderProduct key={index} product={product} />
      )}
      <div className={styles["total"]}>
        <b>Total</b>: Rs.
        {order.totalCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </div>
      <div className={styles["time-stamp"]}>
        <b>Date</b>: {getDate()[0]} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <b>Time</b>: {getDate()[1]}
      </div>
    </div>
  );
};

export default OrderCard;
