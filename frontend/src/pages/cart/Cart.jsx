import React, { useEffect, useState } from "react";
import styles from "./cart.module.css";
import axios from "axios";
import CartItem from "components/cartItem/CartItem";
import Bill from "components/bill/Bill";
import { getUser, storeUser } from "helperFunctions";

const getProducts = async (user, setCart) => {
  if(!user) return;
  let newCart = [];
  await Promise.all(
    user.cart.map(async (cartItem) => {
      const url = `http://localhost:5000/product/get?productId=${cartItem.productId}`;
      const response = await axios.get(url);
      const product = response.data;
      product.quantity = cartItem.quantity;
      newCart.push(product);
    })
  );
  console.log(newCart);
  setCart(newCart);
};

const Cart = () => {
  const [ user, setUser ] = useState();
  const [cart, setCart] = useState();

  // const clearCart = () => {
  //   const url = "http://localhost:5000/user/edit";
  //   const response = axios.post(url, {
  //     userId: user.userId,
  //     prodyc
  //   })
  // }

  const editCartItem = async (productId, increment) => {
    // find product in cart
    const cartItem = user.cart.find(
      element => element["productId"] === productId
    );

    // change quantity
    if (cartItem.quantity + increment < 0) return;
    const editedCartItem = {
      productId: productId,
      quantity: cartItem.quantity + increment
    };

    // add to cart
    const url = "http://localhost:5000/user/add-to-cart";
    let newCart;
    try {
      const response = await axios.post(url, {
        userId: user.userId,
        product: editedCartItem
      });
      newCart = response.data;
      
      if (newCart === "QuantityLimitExceeded") {
        alert("Quantity Limit Exceeded");
        return;
      }
    } catch (error) {
      console.error(`Error adding to cart:-\n${error}`);
      alert("Error editing cart");
      return;
    }

    // update user
    const updatedUser = {
      ...user,
      cart: newCart
    }
    setUser(updatedUser);

    // store user in local storage
    storeUser(updatedUser);
  };
  

  useEffect(() => {
    setUser(getUser());
  }, []);

  useEffect(() => {
    getProducts(user, setCart);
  }, [user]);

  if(!cart) return <>Loading....</>

  return (
    <div className={styles["cart"]} >
      <div className={styles["products"]}>
        {user.cart.length <= 0 ? 
        <>Cart is Empty</>:
        cart.map((cartItem, index) =>
          <CartItem key={index} cartItem={cartItem} editCartItem={editCartItem}/>
        )}
        {/* <button className={styles["clear"]} type="button"onClick={() => clearCart()}>Clear Cart</button> */}
      </div>
      <Bill cart={cart} setCart={setCart}/>
    </div>
  );
};

export default Cart;
