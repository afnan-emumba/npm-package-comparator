import { useEffect, useState } from "react";
import { Tag } from "antd";
import { fetchRepoLanguages } from "@/utils/githubApi";
import { PackageDetails } from "@/types/interfaces";
import { CrownIcon, RepositoryIcon, DocsIcon } from "@/public/icons";
import styles from "./ComparisonResult.module.css";

interface ComparisonResultProps {
  winner: {
    package: PackageDetails;
    ratio: string;
  } | null;
}

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M+";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K+";
  }
  return num.toString();
};

const ComparisonResult = ({ winner }: ComparisonResultProps) => {
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      if (winner?.package.repository) {
        try {
          const { languages } = await fetchRepoLanguages(
            winner.package.repository
          );
          setLanguages(Object.keys(languages).slice(0, 2));
        } catch (error) {
          console.error("Error fetching languages:", error);
        }
      }
    };

    fetchLanguages();
  }, [winner]);

  return (
    <div className={styles.container}>
      <div className={styles.result}>
        <div className={styles.header}>
          <CrownIcon />
          <p>{winner?.package.name}</p>
          <Tag color='blue'>recommended</Tag>
        </div>
        {winner?.package.description}
        <div>
          {languages.map((lang) => (
            <Tag key={lang}>{lang}</Tag>
          ))}
        </div>
        <div className={styles.links}>
          <div className={styles.link}>
            <RepositoryIcon />{" "}
            <a href={winner?.package.repository ?? "#"} target='_blank'>
              Repository
            </a>
          </div>
          <div className={styles.link}>
            <DocsIcon />{" "}
            <a href={winner?.package.homePage ?? "#"} target='_blank'>
              Documentation
            </a>
          </div>
        </div>
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <p className={styles.statName}>Downloads</p>
          <p className={styles.statNumber}>
            {winner ? formatNumber(winner.package.downloadsCount) : null}
          </p>
        </div>
        <div className={styles.stat}>
          <p className={styles.statName}>Stars</p>
          <p className={styles.statNumber}>
            {winner ? formatNumber(winner.package.starsCount) : null}
          </p>
        </div>
        <div className={styles.stat}>
          <p className={styles.statName}>Health</p>
          <p className={styles.statNumber}>
            {winner ? (winner.package.health * 100).toFixed(0) + "%" : null}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComparisonResult;
