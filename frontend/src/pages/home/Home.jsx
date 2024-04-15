import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import Filter from "components/filter/Filter";
import axios from "axios";
import ProductCard from "components/productCard/ProductCard";

const Home = () => {
  const [products, setProducts] = useState();
  const [name, setName] = useState("");
  const [companies, setCompanies] = useState([]);
  const [lowerPrice, setLowerPrice] = useState();
  const [upperPrice, setUpperPrice] = useState();

  const getProducts = async () => {
    setProducts(undefined);
    let url = `http://localhost:5000/product?name=${name}`;
    if (companies.length > 0) url += `&companies=${companies}`;
    if (lowerPrice) url += `&lowerPrice=${lowerPrice}`;
    if (upperPrice) url += `&upperPrice=${upperPrice}`;
    const response = await axios.get(url);
    const products = response.data;
    setProducts(products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={styles["home"]}>
      <Filter
        name={name}
        setName={setName}
        companies={companies}
        setCompanies={setCompanies}
        lowerPrice={lowerPrice}
        setLowerPrice={setLowerPrice}
        upperPrice={upperPrice}
        setUpperPrice={setUpperPrice}
        setProducts={setProducts}
        getProducts={getProducts}
      />
      <div className={styles["products"]}>
        {products ? products.map((product, index) => <ProductCard key={index} product={product} />) : <>Loading....</>}
      </div>
    </div>
  );
};

export default Home;
