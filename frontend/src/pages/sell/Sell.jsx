import React, { useEffect, useState } from "react";
import styles from "./sell.module.css";
import axios from "axios";
import { getUser } from "helperFunctions";

const companyList = [
  "Samsung",
  "Xiami",
  "Apple",
  "Motorola",
  "OnePlus",
  "Oppo",
  "Vivo"
];

const Sell = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState();
  const [description, setDescription] = useState();
  const [features, setFeatures] = useState([]);

  const createFeature = () => {
    const featureList = [...features];
    featureList.push("");
    setFeatures(featureList);
  };

  const changeFeature = (feature, index) => {
    const featureList = [...features];
    featureList[index] = feature;
    setFeatures(featureList);
  };

  const filterFeatures = () => {
    let featureList = [];
    features.forEach((feature) => {
      if(feature !== "") 
        featureList.push(feature)
    })
    setFeatures(featureList);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result;
      setImage(base64String);
    };

    reader.readAsDataURL(file);
  };

  const createProduct = async () => {
    console.log(company)
    if(company === ""){
      alert("Select company")
      return;
    }
    filterFeatures();
    const seller = getUser().userId;

    const url = "http://localhost:5000/product/create";
    await axios.post(url, {
      name,
      company,
      price,
      quantity,
      image,
      description,
      features,
      seller
    });

    alert("Product created successfully");

    window.location.href = "/sell";
  };

  useEffect(() => {
    if(!getUser()) {
      window.location.href = "/account/login";
    }
  }, [])

  return (
    <div className={styles["sell"]}>
      <div className={styles["heading"]}> CREATE NEW PRODUCT </div>
      <label className={styles["label"]}>Name</label>
      <input
        className={styles["input"]}
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />

      <label className={styles["label"]}>Company</label>
      <select
        className={styles["dropdown"]}
        value={company}
        onChange={e => setCompany(e.target.value)}
        required
      >
        <option className={styles["option"]} value="">
          ---- Select ----
        </option>
        {companyList.map((company, index) =>
          <option key={index} className={styles["option"]} value={company}>
            {company}
          </option>
        )}
      </select>

      <label className={styles["label"]}>Price</label>
      <input
        className={styles["input"]}
        type="number"
        value={price}
        onChange={e => setPrice(e.target.value)}
        required
      />

      <label className={styles["label"]}>Quantity</label>
      <input
        className={styles["input"]}
        type="number"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
        required
      />

      <label className={styles["label"]}>Description</label>
      <input
        className={styles["input"]}
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />

      <label className={styles["label"]}>Features</label>
      {console.log(features)}
      {features.map((feature, index) =>
        <input
          key={index}
          className={styles["input"]}
          type="text"
          value={feature}
          onChange={e => changeFeature(e.target.value, index)}
        />
      )}
      <button
        className={styles["add"]}
        type="button"
        onClick={() => createFeature()}
      >
        Add
      </button>

      <input type="file" accept="image/*" required onChange={handleImageChange}/>

      <button
        className={styles["button"]}
        type="button"
        onClick={() => createProduct()}
      >
        CREATE
      </button>
    </div>
  );
};

export default Sell;
