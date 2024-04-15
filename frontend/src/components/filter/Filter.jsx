import React from "react";
import styles from "./filter.module.css";

const companyList = ["Samsung", "Xiami", "Apple", "Motorola", "OnePlus", "Oppo", "Vivo"];

const Filter = ({
  name,
  setName,
  companies,
  setCompanies,
  lowerPrice,
  setLowerPrice,
  upperPrice,
  setUpperPrice,
  getProducts
}) => {
  const handCompanySelection = company => {
    if (companies.includes(company))
      setCompanies(companies.filter(item => item !== company));
    else setCompanies([...companies, company]);
  };

  return (
    <div className={styles["filter"]}>
      <div className={styles["heading"]}>FILTERS</div>
      <input
        className={styles["search"]}
        type="search"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Search..."
      />
      <br/><br/>
      <div className={styles["filter-option"]}>
        <b>Brands</b>
        {companyList.map((company, index) =>
          <div key={index} className={styles["company"]}>
            <label>
              {company}
            </label>
            <input
              type="checkbox"
              checked={companies.includes(company.toLowerCase())}
              onChange={() => handCompanySelection(company.toLowerCase())}
            />
          </div>
        )}
      </div>
      <br/>
      <div className={styles["filter-option"]}>
        <b>Lower Price</b>
        <input
          className={styles["price"]}
          type="number"
          value={lowerPrice}
          onChange={e => setLowerPrice(e.target.value)}
        />
      </div>
      <div className={styles["filter-option"]}>
        <b>Upper Price</b>
        <input
          className={styles["price"]}
          type="number"
          value={upperPrice}
          onChange={e => setUpperPrice(e.target.value)}
        />
      </div>
      <button className={styles["button"]} type="button" onClick={() => getProducts()}>Search</button>
    </div>
  );
};

export default Filter;
