import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./product.module.css";
import axios from "axios";
import { getUser, storeUser } from "helperFunctions";

const Product = () => {
  const [user, setUser] = useState();
  const [product, setProduct] = useState();
  const { productId } = useParams();

  const getProduct = async () => {
    const url = `http://localhost:5000/product/get?productId=${productId}`;
    const response = await axios.get(url);
    const product = response.data;
    setProduct(product);
  };

  const addToCart = async () => {
    const user = getUser();
    // assign quantity
    const existingCartItem = user.cart.find(element => element["productId"] === productId);
    let quantityNeeded;
    if(!existingCartItem) quantityNeeded = 1;
    else quantityNeeded = existingCartItem.quantity + 1;

    const cartItem = {productId: product.productId, quantity: quantityNeeded};

    // add product to cart
    const url = "http://localhost:5000/user/add-to-cart";
    let newCart;
    try{
      const response = await axios.post(url, {
        userId: user.userId,
        product: cartItem
      });
      newCart = response.data;

      // if quantity exceeds
      if(newCart === "QuantityLimitExceeded"){
        alert("Quantity Limit Exceeded");
        return;
      }
    } catch (error) {
      console.error(`Error adding to cart:-\n${error}`);
      alert("Error adding to cart");
      return;
    }

    console.log(newCart);
    //change user data
    const updatedUser = {
      ...user,
      cart: newCart
    }
    
    // set user data in local storage
    setUser(updatedUser);
    storeUser(updatedUser);
    console.log(getUser());
    alert("Added to Cart");
  }

  useEffect(() => {
    setUser(getUser());
    getProduct();
  }, []);

  return (
    <div className={styles["product"]}>
      {!product? <>Loading....</>:<>
      <div className={styles["intro"]}>
        <img
          className={styles["image"]}
          src={product.image}
          alt={product.name}
        />
        <div className={styles["text"]}>
          <div className={styles["name"]}>
            {product.name}
          </div>
          <div className={styles["brand"]}>
            {product.company}
          </div>
          <div className={styles["description"]}>
            {product.description}
          </div>
        <button 
          className={styles["add-to-cart"]} 
          disabled= {product.quantity < 1}
          type="button" onClick={() => addToCart()}
        >
          {product.quantity > 0? "ADD TO CART" : "OUT OF STOCK"}
        </button>
        </div>
      </div>
      <hr/>
      <div className={styles["feature-list"]}>
        <div className={styles["features-heading"]}>FEATURES</div>
        <ul>
          {product.features.map((feature, index) =>
            <li key={index} className={styles["feature"]}>
              {feature}
            </li>
          )}
        </ul>
      </div>
      </>}
    </div>
  );
};

export default Product;
