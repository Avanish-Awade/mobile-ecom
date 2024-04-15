import React, { useEffect, useState } from 'react';
import styles from "./orders.module.css";
import { getUser } from 'helperFunctions';
import axios, { all } from 'axios';
import OrderCard from 'components/orderCard/OrderCard';

const Orders = () => {
  const user = getUser();
  const [orders, setOrders] = useState([]);

  const getProducts = async (productList) => {
    const products = [];
    await Promise.all(productList.map( async (product) => {
      const url = `http://localhost:5000/product/get?productId=${product.productId}`;
      const response = await axios.get(url);
      const quantity = product.quantity;
      product = response.data;
      delete product.features;
      delete product.description;
      delete product.seller;
      product.quantity = quantity;
      products.push(product);
    }));
    return products;
  }

  const getOrders = async () => {
    if(!user) {
      window.location.href = "/account/login";
    }
    const orderList = [...user.orders].reverse();
    
    const allOrders = await Promise.all(orderList.map(async (orderId) => {
      const url = `http://localhost:5000/order/get?orderId=${orderId}`;
      const response = await axios.get(url);
      let order = response.data;
      
      const productList = await getProducts(order.products);
      order.products = productList;
      return order;
    }));
    setOrders(allOrders);
    console.log(allOrders);
  }

  useEffect(() => {
    getOrders();
  }, [])

  if(orders.length <= 0) return <>Loading....</>
  return (
    <div className={styles["orders"]}>
      <div className={styles["heading"]}>YOUR ORDERS</div>
      {orders.map((order, index) => 
        <OrderCard key={index} order={order}  />
      )}
    </div>
  )
}

export default Orders;