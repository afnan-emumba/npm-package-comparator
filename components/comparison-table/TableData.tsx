import { Tag } from "antd";
import { formatDistanceToNow } from "date-fns";
import { PackageDetails } from "@/types/interfaces";

interface MyTableProps {
  key: string;
  package1: React.ReactNode;
  package2: React.ReactNode;
}

export const getTableData = (packages: PackageDetails[]): MyTableProps[] => [
  {
    key: "Description",
    package1: packages[0].description,
    package2: packages[1].description,
  },
  {
    key: "Keywords",
    package1:
      packages[0].keywords.length > 0
        ? packages[0].keywords
            .slice(0, 4)
            .map((keyword) => <Tag key={keyword}>{keyword}</Tag>)
        : "N/A",
    package2:
      packages[1].keywords.length > 0
        ? packages[1].keywords
            .slice(0, 4)
            .map((keyword) => <Tag key={keyword}>{keyword}</Tag>)
        : "N/A",
  },
  {
    key: "Repository",
    package1: packages[0].repository ? (
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {packages[0].homePage && (
          <a href={packages[0].homePage} target='_blank'>
            HomePage
          </a>
        )}{" "}
        {packages[0].bugs && (
          <a href={packages[0].bugs} target='_blank'>
            Bugs
          </a>
        )}{" "}
        <a href={packages[0].repository} target='_blank'>
          GitHub
        </a>
      </div>
    ) : (
      "N/A"
    ),
    package2: packages[1].repository ? (
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {packages[1].homePage && (
          <a href={packages[1].homePage} target='_blank'>
            HomePage
          </a>
        )}{" "}
        {packages[1].bugs && (
          <a href={packages[1].bugs} target='_blank'>
            Bugs
          </a>
        )}{" "}
        <a href={packages[1].repository} target='_blank'>
          GitHub
        </a>
      </div>
    ) : (
      "N/A"
    ),
  },
  {
    key: "License",
    package1: packages[0].license ? (
      <Tag color='gold'>{packages[0].license}</Tag>
    ) : (
      ""
    ),
    package2: packages[1].license ? (
      <Tag color='gold'>{packages[1].license}</Tag>
    ) : (
      ""
    ),
  },
  {
    key: "Last Modification Date",
    package1: `${formatDistanceToNow(new Date(packages[0].lastModified))} ago`,
    package2: `${formatDistanceToNow(new Date(packages[1].lastModified))} ago`,
  },
  {
    key: "Authors/Publishers",
    package1: packages[0].author ? (
      <a
        href={`https://www.github.com/${packages[0].author}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        {packages[0].author}
      </a>
    ) : (
      "N/A"
    ),
    package2: packages[1].author ? (
      <a href={`https://www.github.com/${packages[1].author}`} target='_blank'>
        {packages[1].author}
      </a>
    ) : (
      "N/A"
    ),
  },
  {
    key: "Maintainers",
    package1: packages[0].maintainerEmail || "",
    package2: packages[1].maintainerEmail || "",
  },
];
