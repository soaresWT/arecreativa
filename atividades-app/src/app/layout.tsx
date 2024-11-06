import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, theme } from "antd";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "App pedagógico",
  description: "gerenciamento de atividades",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AntdRegistry>
          <ConfigProvider>{children}</ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
