import React from "react";

interface PackageDetails {
  name: string;
  description: string;
  lastModified: string;
}

interface ComparisonTableProps {
  packages: PackageDetails[];
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ packages }) => {
  return (
    <div>
      <h2>Comparison Table</h2>
      <table>
        <thead>
          <tr>
            <th>Package Name</th>
            <th>Description</th>
            <th>Last Modified</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg.name}>
              <td>{pkg.name}</td>
              <td>{pkg.description}</td>
              <td>{pkg.lastModified}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
