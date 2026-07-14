export type CatalogProduct = {
  name: string;
  category: string;
  tag: string;
};

type ProductFilters = {
  category?: string;
  query?: string;
};

function normalize(value: string) {
  return value.trim().toLocaleLowerCase("vi-VN");
}

export function filterProducts<T extends CatalogProduct>(
  products: T[],
  { category, query }: ProductFilters,
) {
  const normalizedQuery = query ? normalize(query) : "";

  return products.filter((product) => {
    const matchesCategory = !category || product.category === category;
    const searchText = normalize(
      `${product.name} ${product.category} ${product.tag}`,
    );

    return matchesCategory && (!normalizedQuery || searchText.includes(normalizedQuery));
  });
}
