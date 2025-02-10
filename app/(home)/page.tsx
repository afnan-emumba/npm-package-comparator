"use client";

import { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import SearchBar from "@/components/search-bar/SearchBar";
import ComparisonTable from "@/components/comparison-table/ComparisonTable";
import { fetchPackageDetails } from "@/utils/npmApi";
import styles from "./HomePage.module.css";

const Home = () => {
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [comparisonData, setComparisonData] = useState<any[]>([]);

  const handleCompare = async () => {
    if (selectedPackages.length > 2) {
      alert("You can only select 2 packages for comparison");
      return;
    }

    const packageDetails = await Promise.all(
      selectedPackages.map((pkg) => fetchPackageDetails(pkg))
    );
    setComparisonData(packageDetails);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <SearchBar
          selectedPackages={selectedPackages}
          setSelectedPackages={setSelectedPackages}
          onCompare={handleCompare}
        />
        {comparisonData.length > 0 && (
          <ComparisonTable packages={comparisonData} />
        )}
      </div>
    </div>
  );
};

export default Home;
