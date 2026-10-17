import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Lora } from "next/font/google";
import "./globals.css";
import "./storefront-refresh.css";
import { RouteScroll } from "@/components/marketing/route-scroll";
import { SocialContactRail } from "@/components/marketing/social-contact-rail";
import { StructuredData } from "@/components/marketing/structured-data";
import { localBusinessSchema } from "@/lib/local-business-schema";
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  pageMetadata,
  SITE_URL,
} from "@/lib/site-seo";

const uiFont = Be_Vietnam_Pro({
  display: "swap",
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam",
  weight: ["400", "500", "600", "700"],
});

const editorialFont = Lora({
  display: "swap",
  preload: false,
  subsets: ["latin", "vietnamese"],
  variable: "--font-lora",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  openGraph: pageMetadata({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    path: "/",
  }).openGraph,
  twitter: pageMetadata({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    path: "/",
  }).twitter,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
        <RouteScroll />
        <StructuredData data={localBusinessSchema} />
        <a className="skip-link" href="#main-content">
          Bỏ qua đến nội dung chính
        </a>
        {children}
        <SocialContactRail />
      </body>
    </html>
  );
}
