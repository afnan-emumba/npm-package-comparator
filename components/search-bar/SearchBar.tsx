"use client";

import { Select, Button } from "antd";
import { SearchIcon } from "@/public/icons";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <div className={styles.container}>
      <Select
        placeholder='Select two packages to compare'
        style={{ width: "100%" }}
      />
      <Button className={styles.button} type='primary'>
        <div style={{ color: "white", display: "flex", alignItems: "center" }}>
          <SearchIcon />
        </div>
        Compare
      </Button>
    </div>
  );
};

export default SearchBar;
