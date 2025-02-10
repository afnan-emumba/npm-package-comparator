"use client";

import { useState } from "react";
import { Select, Button, Skeleton } from "antd";
import debounce from "lodash/debounce";
import { SearchIcon } from "@/public/icons";
import { fetchPackages } from "@/utils/npmApi";
import styles from "./SearchBar.module.css";

const { Option } = Select;

interface SearchBarProps {
  selectedPackages: string[];
  setSelectedPackages: (value: string[]) => void;
  onCompare: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  selectedPackages,
  setSelectedPackages,
  onCompare,
}) => {
  const [packages, setPackages] = useState<{ value: string; label: string }[]>(
    []
  );
  const [fetching, setFetching] = useState(false);

  const handleSearch = debounce(async (value: string) => {
    if (value) {
      setFetching(true);
      const results = await fetchPackages(value);
      setPackages(results);
      setFetching(false);
    } else {
      setPackages([]);
    }
  }, 800);

  const handleChange = (value: string[]) => {
    setSelectedPackages(value);
  };

  const isButtonDisabled = selectedPackages.length < 2;

  return (
    <div className={styles.container}>
      <Select
        mode='multiple'
        placeholder='Select two packages to compare'
        notFoundContent={
          fetching ? (
            <Skeleton.Input active size='small' block />
          ) : (
            "No results found"
          )
        }
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        style={{ width: "100%" }}
        value={selectedPackages}
      >
        {packages.map((pkg) => (
          <Option key={pkg.value} value={pkg.value}>
            {pkg.label}
          </Option>
        ))}
      </Select>
      <Button
        className={styles.button}
        type='primary'
        disabled={isButtonDisabled}
        onClick={onCompare}
      >
        <div
          style={{
            color: isButtonDisabled ? "#D9D9D9" : "white",
            display: "flex",
            alignItems: "center",
          }}
        >
          <SearchIcon />
        </div>
        Compare
      </Button>
    </div>
  );
};

export default SearchBar;
