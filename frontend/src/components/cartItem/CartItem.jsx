import React from "react";
import styles from "./cartItem.module.css";

const CartItem = ({ cartItem, editCartItem }) => {
  const calculateCost = () => {
    const cost = cartItem.price * cartItem.quantity;
    return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  if(!cartItem) return <>Loading....</>
  return (
    <div className={styles["cart-item"]}>
      <img
        className={styles["image"]}
        src={cartItem.image}
        alt={cartItem.name}
      />
      <div className={styles["text"]}>
        <div className={styles["name"]}>
          {cartItem.name}
        </div>
        <div className={styles["brand"]}>
          {cartItem.company}
        </div>
        <div className={styles["cost"]}>
          {cartItem.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} x {cartItem.quantity} = <b>Rs. {calculateCost()}</b>
        </div>
        <div className={styles["counter"]} >
          <button
            className={styles["dec"]}
            disabled={cartItem.quantity <= 0}
            type="button"
            onClick={() => editCartItem(cartItem.productId, -1)}
          > - </button>
          {cartItem.quantity}
          <button
            className={styles["inc"]}
            type="button"
            onClick={() => editCartItem(cartItem.productId, 1)}
          > + </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
