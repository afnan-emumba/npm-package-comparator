import type { ThemeConfig } from "antd";

export const antTheme: ThemeConfig = {
  token: {
    colorPrimary: "#1890FF",
    borderRadius: 4,
  },
  components: {
    Select: {
      borderRadius: 0,
    },
  },
};
