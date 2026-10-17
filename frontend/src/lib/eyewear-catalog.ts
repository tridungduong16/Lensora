import catalog from "@/data/eyewear-catalog.json";

export type EyewearProduct = (typeof catalog)[number];
export const eyewearProducts = catalog;
export const eyewearBrands = ["PARIM", "EXFASH", "New Balance"] as const;

export function formatVnd(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
}

export function getEyewearProduct(slug: string) {
  return eyewearProducts.find((product) => product.slug === slug);
}
