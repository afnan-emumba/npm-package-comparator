import { Tag } from "antd";
import type { TableProps } from "antd";
import { formatDistanceToNow } from "date-fns";
import { PackageDetails } from "@/types/interfaces";

interface MyTableProps {
  key: string;
  package1: React.ReactNode;
  package2: React.ReactNode;
}

export const tableColumns = (
  packages: PackageDetails[]
): TableProps<MyTableProps>["columns"] => [
  {
    title: "Package Name",
    dataIndex: "key",
    rowScope: "row",
    width: 200,
  },
  {
    title: `${packages[0].name} (v${packages[0].version})`,
    dataIndex: "package1",
    width: 300,
    render: (text, record) =>
      record.key === "Description" ? (
        text
      ) : (
        <div style={{ textAlign: "center" }}>{text}</div>
      ),
  },
  {
    title: `${packages[1].name} (v${packages[1].version})`,
    dataIndex: "package2",
    width: 300,
    render: (text, record) =>
      record.key === "Description" ? (
        text
      ) : (
        <div style={{ textAlign: "center" }}>{text}</div>
      ),
  },
];
