import React, { useState } from "react";
import styles from "./auth.module.css";
import axios from "axios";
import { storeUser } from "helperFunctions";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const url = "http://localhost:5000/user/login";
    const response = await axios.post(url, {
      email,
      password
    });

    const user = response.data;
    if (user === "InvalidCredentials") {
      alert("Invalid credentials");
      return;
    }

    storeUser(user);
    window.location.href = "/";
  };

  return (
    <div className={styles["login"]}>
      <div className={styles["heading"]}> LOGIN </div>
      <label className={styles["label"]}>Email</label>
      <input
        className={styles["input"]}
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <label className={styles["label"]}>Password</label>
      <input
        className={styles["input"]}
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button
        className={styles["button"]}
        type="button"
        onClick={() => login()}
      >
        SUBMIT
      </button>
      <Link className={styles["link"]} to="/account/sign-up">
        Create Account
      </Link>
    </div>
  );
};

export default Login;
