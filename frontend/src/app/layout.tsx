import type { Metadata } from "next";
import { Be_Vietnam_Pro, Lora } from "next/font/google";
import "./globals.css";

const uiFont = Be_Vietnam_Pro({
  display: "swap",
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam",
  weight: ["400", "500", "600", "700"],
});

const editorialFont = Lora({
  display: "swap",
  subsets: ["latin", "vietnamese"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
});

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
    <html
      className={`${uiFont.variable} ${editorialFont.variable}`}
      data-scroll-behavior="smooth"
      lang="vi"
    >
      <body>
        <a className="skip-link" href="#main-content">
          Bỏ qua đến nội dung chính
        </a>
        {children}
      </body>
    </html>
  );
}
