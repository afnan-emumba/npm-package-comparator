"use client";

import { useState } from "react";
import { notification, Card } from "antd";
import Navbar from "@/components/navbar/Navbar";
import SearchBar from "@/components/search-bar/SearchBar";
import ComparisonTable from "@/components/comparison-table/ComparisonTable";
import DownloadsChart from "@/components/downloads-chart/DownloadsChart";
import { fetchPackageDetails } from "@/utils/npmApi";
import { ErrorIcon } from "@/public/icons";
import { comparePackages } from "@/utils/comparePackages";
import ComparisonResult from "@/components/comparison-result/ComparisonResult";
import { PackageDetails } from "@/types/interfaces";
import styles from "./HomePage.module.css";

const Home = () => {
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  // eslint-disable-next-line
  const [comparisonData, setComparisonData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [winner, setWinner] = useState<{
    package: PackageDetails;
    ratio: string;
  } | null>(null);

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
      if (packageDetails.length === 2) {
        const { winner, ratio } = comparePackages(
          packageDetails[0],
          packageDetails[1]
        );
        setWinner({ package: winner, ratio });
      }
    } catch (error) {
      console.log(error);
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
  const winnerTitle = () => {
    return (
      <>
        ✨{winner?.package.name} is{" "}
        <span
          style={{
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          {winner?.ratio}x
        </span>{" "}
        better!✨
      </>
    );
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
              <DownloadsChart packages={comparisonData} />
            </Card>
            <Card title={winnerTitle()} style={{ width: 850 }}>
              <ComparisonResult winner={winner} />
            </Card>
          </div>
        )}
      </div>
      <p className={styles.footer}>Copyright ©2025 Emumba Inc.</p>
    </div>
  );
};

export default Home;
