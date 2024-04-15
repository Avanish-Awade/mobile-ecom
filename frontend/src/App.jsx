import { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "pages/auth/Login";
import Signup from "pages/auth/Signup";
import Home from "pages/home/Home";
import Product from "pages/product/Product";
import Cart from "pages/cart/Cart";
import Orders from "pages/orders/Orders";
import Layout from "components/Layout";
import Sell from "pages/sell/Sell";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/account">
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<Signup />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product/:productId" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="sell" element={<Sell />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;