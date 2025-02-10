import { formatDistanceToNow } from "date-fns";
import { Tag } from "antd";

interface PackageDetails {
  name: string;
  description: string;
  lastModified: string;
  version: string;
  keywords: string[];
  repository: string | null;
  license: string | null;
  author: string | null;
  maintainerEmail: string | null;
}

interface ComparisonTableProps {
  packages: PackageDetails[];
}

const ComparisonTable = ({ packages }: ComparisonTableProps) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Package Name</th>
            <th>Description</th>
            <th>Last Modified</th>
            <th>Version</th>
            <th>Keywords</th>
            <th>Repository</th>
            <th>License</th>
            <th>Author</th>
            <th>Maintainer Email</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg.name}>
              <td>{pkg.name}</td>
              <td>{pkg.description}</td>
              <td>{`last modified ${formatDistanceToNow(
                new Date(pkg.lastModified)
              )} ago`}</td>
              <td>{pkg.version}</td>
              <td>{pkg.keywords.join(", ")}</td>
              <td>{pkg.repository}</td>
              <td>
                <Tag color='gold'>{pkg.license}</Tag>
              </td>
              <td>{pkg.author || "N/A"}</td>
              <td>{pkg.maintainerEmail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
