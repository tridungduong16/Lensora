import { serializeStructuredData } from "@/components/marketing/structured-data";
import { localBusinessSchema } from "./local-business-schema";
import { absoluteUrl, pageMetadata, SITE_URL } from "./site-seo";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

test("produces production canonicals and share URLs instead of inheriting the homepage", () => {
  const metadata = pageMetadata({
    title: "Đo mắt Vĩnh Long",
    description: "Thông tin lịch hẹn",
    path: "/do-mat",
  });
  expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/do-mat`);
  expect(metadata.openGraph).toMatchObject({
    url: `${SITE_URL}/do-mat`,
    locale: "vi_VN",
  });
  expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
});

test("discovers unique canonical routes and local product images without filter or alias URLs", () => {
  const entries = sitemap();
  const urls = entries.map((entry) => entry.url);
  expect(new Set(urls).size).toBe(urls.length);
  expect(urls).toEqual(
    expect.arrayContaining([
      absoluteUrl("/"),
      absoluteUrl("/do-mat"),
      absoluteUrl("/cua-hang"),
      absoluteUrl("/san-pham/bolon-gong-vuong"),
    ]),
  );
  expect(urls).not.toContain(absoluteUrl("/kinh-mat"));
  expect(
    urls.every((url) => url.startsWith(SITE_URL) && !url.includes("?")),
  ).toBe(true);
  expect(entries.filter((entry) => entry.images?.length)).toHaveLength(13);
  expect(robots().sitemap).toBe(absoluteUrl("/sitemap.xml"));
});

test("identifies the optical store using confirmed contact details without invented ratings or offers", () => {
  const business = localBusinessSchema["@graph"][0];
  expect(business).toMatchObject({
    "@type": "Optician",
    telephone: "+84858060789",
    address: {
      streetAddress: "85 Phạm Thái Bường, Phường 4",
      addressLocality: "Vĩnh Long",
      postalCode: "85000",
      addressCountry: "VN",
    },
  });
  expect(business).not.toHaveProperty("aggregateRating");
  expect(business).not.toHaveProperty("offers");
});

test("escapes script boundaries in JSON-LD while preserving the original text", () => {
  const data = { name: "</script><script>alert('test')</script>" };
  const serialized = serializeStructuredData(data);
  expect(serialized).not.toContain("<");
  expect(JSON.parse(serialized)).toEqual(data);
});
