import React from "react";
import styles from "./productCard.module.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      className={styles["product-card"]}
      to={`/product/${product.productId}`}
    >
      <img
        className={styles["image"]}
        src={product.image}
        alt={product.name}
      />
      <div className={styles["name"]}>
        {product.name}
      </div>
      <div className={styles["price"]}>
        Rs. {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </div>
    </Link>
  );
};

export default ProductCard;
