import type { MetadataRoute } from "next";
import { eyewearProducts } from "@/lib/eyewear-catalog";
import { lensPriceCategories } from "@/components/marketing/lens-pricing-data";
import { absoluteUrl } from "@/lib/site-seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // /kinh-mat is a catalogue alias with /gong-kinh as its canonical.
  const pages = [
    "/",
    "/do-mat",
    "/cua-hang",
    "/bac-si",
    "/gong-kinh",
    "/kinh-ram",
    "/bang-gia",
  ];
  return [
    ...pages.map((path) => ({ url: absoluteUrl(path) })),
    ...lensPriceCategories.map(({ id }) => ({
      url: absoluteUrl(`/bang-gia/${id}`),
    })),
    ...eyewearProducts.map((product) => ({
      url: absoluteUrl(`/san-pham/${product.slug}`),
      images: product.images.map((image) => absoluteUrl(image.src)),
    })),
  ];
}
