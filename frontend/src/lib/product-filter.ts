export type CatalogProduct = {
  name: string;
  category: string;
  tag: string;
  brand?: string;
  material?: string;
  description?: string;
  priceValue?: number;
};

type ProductFilters = {
  category?: string;
  query?: string;
  brand?: string;
  maxPrice?: number;
};

function normalize(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("vi-VN")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}

export function filterProducts<T extends CatalogProduct>(
  products: T[],
  { category, query, brand, maxPrice }: ProductFilters,
) {
  const normalizedQuery = query ? normalize(query) : "";

  return products.filter((product) => {
    const matchesCategory =
      !category ||
      product.category === category ||
      (category === "Kính mắt" && product.category === "Gọng kính");
    const searchText = normalize(
      `${product.name} ${product.category} ${product.tag} ${product.brand ?? ""} ${product.material ?? ""} ${product.description ?? ""}`,
    );

    return (
      matchesCategory &&
      (!brand || product.brand === brand) &&
      (!maxPrice ||
        (product.priceValue !== undefined && product.priceValue <= maxPrice)) &&
      (!normalizedQuery || searchText.includes(normalizedQuery))
    );
  });
}
