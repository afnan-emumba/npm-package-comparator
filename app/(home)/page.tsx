"use client";

import { useState } from "react";
import { notification, Card } from "antd";
import Navbar from "@/components/navbar/Navbar";
import SearchBar from "@/components/search-bar/SearchBar";
import ComparisonTable from "@/components/comparison-table/ComparisonTable";
import { fetchPackageDetails } from "@/utils/npmApi";
import { ErrorIcon } from "@/public/icons";
import styles from "./HomePage.module.css";

const Home = () => {
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [comparisonData, setComparisonData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCompare = async () => {
    if (selectedPackages.length > 2) {
      notification.open({
        message: "Error",
        description: "You can only select 2 packages for comparison",
        icon: <ErrorIcon />,
        placement: "bottomRight",
      });
      return;
    }

    setLoading(true);
    try {
      const packageDetails = await Promise.all(
        selectedPackages.map((pkg) => fetchPackageDetails(pkg))
      );
      setComparisonData(packageDetails);
    } catch (error) {
      notification.open({
        message: "Error",
        description: "Something went wrong, please try again later",
        icon: <ErrorIcon />,
        placement: "bottomRight",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <SearchBar
          selectedPackages={selectedPackages}
          setSelectedPackages={setSelectedPackages}
          onCompare={handleCompare}
          loading={loading}
        />
        {comparisonData.length > 0 && (
          <div className={styles.cards}>
            <Card title='Comparison' style={{ width: 850 }}>
              <ComparisonTable packages={comparisonData} />
            </Card>
            <Card title='Downloads' style={{ width: 850 }}>
              <h1>Downloads</h1>
            </Card>
            <Card title='Winner' style={{ width: 850 }}>
              <h1>Winner</h1>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
