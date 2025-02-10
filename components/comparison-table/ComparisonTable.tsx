import { formatDistanceToNow } from "date-fns";
import { Tag, Table } from "antd";
import type { TableProps } from "antd";
import { PackageDetails } from "@/types/interfaces";
import { tableColumns } from "./TableColumns";
import { getTableData } from "./TableData";

interface MyTableProps {
  key: string;
  package1: React.ReactNode;
  package2: React.ReactNode;
}

interface ComparisonTableProps {
  packages: PackageDetails[];
}

const ComparisonTable = ({ packages }: ComparisonTableProps) => {
  console.log(packages[0]);
  const columns = tableColumns(packages);
  const data = getTableData(packages);

  return (
    <div>
      <Table<MyTableProps>
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </div>
  );
};

export default ComparisonTable;
