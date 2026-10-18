import catalog from "@/data/eyewear-catalog.json";

export type EyewearProduct = Omit<(typeof catalog)[number], "priceValue"> & {
  priceValue: number | null;
};
export const eyewearProducts: EyewearProduct[] = catalog;
export const eyewearBrands = [...new Set(catalog.map(({ brand }) => brand))];

export function formatVnd(value: number | null) {
  if (value === null) return "Liên hệ";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
}

export function getEyewearProduct(slug: string) {
  return eyewearProducts.find((product) => product.slug === slug);
}
