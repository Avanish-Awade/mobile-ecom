import React, { useState } from "react";
import styles from "./auth.module.css";
import axios from "axios";
import { storeUser } from "helperFunctions";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUp = async () => {
    if (password !== confirmPassword) {
      alert("Both password not same");
      return;
    }

    if ([email, name, password].some(state => state === "")) {
      alert("Fill all fields");
      return;
    }

    const url = "http://localhost:5000/user/create";
    const response = await axios.post(url, {
      email,
      name,
      password
    });

    const user = response.data;
    if (user === "UserFound") {
      alert("User already exists with this email");
      return;
    }

    alert("User created successfully");

    storeUser(user);
    window.location.href = "/account/login";
  };

  return (
    <div className={styles["signup"]}>
      <div className={styles["heading"]}> SIGN UP </div>
      <label className={styles["label"]}>Email</label>
      <input
        className={styles["input"]}
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />

      <label className={styles["label"]}>Name</label>
      <input
        className={styles["input"]}
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
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

      <label className={styles["label"]}>Confirm Password</label>
      <input
        className={styles["input"]}
        type="password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        required
      />

      <button
        className={styles["button"]}
        type="button"
        onClick={() => signUp()}
      >
        SUBMIT
      </button>
      <Link className={styles["link"]} to="/account/login">
        Already have account ?
      </Link>
    </div>
  );
};

export default Signup;
