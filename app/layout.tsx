import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import AntdProvider from "@/components/ant-provider/AntProvider";
import "./globals.css";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NPM Package Comparator",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={roboto.className}>
      <head>
        <link rel='icon' href='/favicon.svg' />
      </head>
      <body id='root'>
        <AntdProvider>{children}</AntdProvider>
      </body>
    </html>
  );
}
