"use client";

import { ConfigProvider } from "antd";
import { antTheme } from "@/theme/antTheme";

export default function AntdProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConfigProvider theme={antTheme}>{children}</ConfigProvider>;
}
