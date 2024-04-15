import React, { useEffect, useState } from "react";
import styles from "./bill.module.css";
import axios from "axios";
import { getUser, storeUser } from "helperFunctions";

const Bill = ({ cart, setCart }) => {
  const [user, setUser ] = useState();

  const calculateCost = cartItem => {
    const cost = cartItem.price * cartItem.quantity;
    return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // calculate total cost
  const calculateTotal = () => {
    let totalCost = 0;
    cart.forEach(cartItem => {
      const cost = cartItem.price * cartItem.quantity;
      totalCost += cost;
    });
    return totalCost;
  };

  const placeOrder = async () => {
    // keep relevant cart items
    let products = [];
    for (let i in cart) {
      if (cart[i].quantity <= 0) continue;
      products.push({
        productId: cart[i].productId,
        quantity: cart[i].quantity
      });
    }

    const order = {
      products,
      totalCost: calculateTotal()
    };

    // place order
    const url = "http://localhost:5000/user/place-order";
    const response = await axios.post(url, {
      order,
      userId: user.userId 
    });

    // update user
    const updatedUser = response.data;
    const orders = updatedUser.orders;
    const orderId = orders[orders.length - 1];
    setCart(updatedUser.cart);
    alert("Order placed: " + orderId);

    // store user in local storage
    storeUser(updatedUser)
    setUser(updatedUser);
    window.location.href = "/orders";
  };

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <div className={styles["bill"]}>
      <div className={styles["heading"]}>ORDER SUMMARY</div>
      <div className={styles["cart"]}>
        {cart.map((cartItem, index) => {
          if (cartItem.quantity <= 0) return null;
          return (
            <div key={index} className={styles["cart-item"]}>
              <div className={styles["title"]}>
                {cartItem.name} (x{cartItem.quantity})
              </div>
              <div className={styles["cost"]}>
                Rs. {calculateCost(cartItem)}
              </div>
            </div>
          );
        })}
      </div>
      __________________
      <div className={styles["total"]}>
        <div className={styles["title"]}>Total</div>
        <div className={styles["cost"]}>
          Rs.{" "}
          {calculateTotal().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
      </div>
      <div
        className={styles["buy"]}
        disabled={calculateTotal() <= 0}
        onClick={() => placeOrder()}
      >
        BUY
      </div>
    </div>
  );
};

export default Bill;
