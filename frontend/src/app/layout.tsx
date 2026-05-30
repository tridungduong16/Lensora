import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kính thuốc Anh Thi | Kính thuốc, kính mát và gọng kính",
  description:
    "Kính thuốc Anh Thi cung cấp gọng kính, kính thuốc, kính mát và dịch vụ đo mắt với phong cách mua sắm tối giản, rõ ràng.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
