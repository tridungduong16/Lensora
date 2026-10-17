import type { Metadata } from "next";

export const SITE_URL = "https://kinhthuocanhthi.com";
export const SITE_NAME = "Kính thuốc Anh Thi";
export const HOME_TITLE =
  "Kính thuốc Vĩnh Long | Đo mắt tại Kính thuốc Anh Thi";
export const HOME_DESCRIPTION =
  "Kính thuốc Anh Thi tại Vĩnh Long: đo mắt, tư vấn kính thuốc, thử gọng PARIM, EXFASH, New Balance. Ghé 85 Phạm Thái Bường, Phường 4. Gọi 085 806 0789.";
export const SHARE_IMAGE = "/images/anh-thi-vinh-long.png";

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function pageMetadata({
  title,
  description,
  path,
  image = SHARE_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = absoluteUrl(path);
  const images = [{ url: absoluteUrl(image), alt: title }];
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      siteName: SITE_NAME,
      title,
      description,
      url,
      images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
