import React from "react";
import styles from "./navbar.module.css";
import { Link, redirect } from "react-router-dom";
import { getUser, storeUser } from "helperFunctions";

const Navbar = ({ children }) => {
  const user = getUser();

  const signOut = () => {
    window.location.href = "/account/login";
  }

  return (
    <div className={styles["navbar"]}>
      <div className={styles["nav-options"]}>
        <Link to="/">Home</Link>
        <Link to="/sell">Sell</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/cart">Cart</Link>
        <button className={styles["user"]} type="button">
          {user ? <div onClick={() => signOut()}>{user.name}</div> : <Link to="/account/login">Login</Link>}
        </button>
      </div>
      {children}
    </div>
  );
};

export default Navbar;
