import { stores } from "@/components/marketing/storefront-data";
import { absoluteUrl, SITE_NAME, SITE_URL, SHARE_IMAGE } from "./site-seo";

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Optician",
      "@id": `${SITE_URL}/#store`,
      name: SITE_NAME,
      url: SITE_URL,
      telephone: "+84858060789",
      description:
        "Cửa hàng kính thuốc, đo mắt và tư vấn gọng kính tại Vĩnh Long.",
      image: absoluteUrl(SHARE_IMAGE),
      logo: absoluteUrl("/icon.png"),
      address: {
        "@type": "PostalAddress",
        streetAddress: "85 Phạm Thái Bường, Phường 4",
        addressLocality: "Vĩnh Long",
        addressRegion: "Vĩnh Long",
        postalCode: "85000",
        addressCountry: "VN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 10.241584976617,
        longitude: 105.98022663598,
      },
      hasMap: stores[0].mapUrl,
      areaServed: { "@type": "AdministrativeArea", name: "Vĩnh Long" },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "11:00",
          closes: "12:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday", "Sunday"],
          opens: "08:00",
          closes: "11:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "17:00",
          closes: "19:00",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "vi-VN",
      publisher: { "@id": `${SITE_URL}/#store` },
    },
  ],
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, path }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: absoluteUrl(path),
    })),
  };
}
