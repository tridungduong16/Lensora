import { filterProducts, type CatalogProduct } from "./product-filter";

const products: CatalogProduct[] = [
  {
    name: "Anh Thi Classic 01",
    category: "Kính mắt",
    tag: "Best seller",
  },
  {
    name: "Minimal Titanium 22",
    category: "Gọng kính",
    tag: "Ultra light",
  },
  {
    name: "Sunline Polar",
    category: "Kính mát",
    tag: "UV400",
  },
];

test("filters products with a case-insensitive search query", () => {
  expect(filterProducts(products, { query: "titanium" })).toHaveLength(1);
});

test("filters products by their exact category", () => {
  expect(filterProducts(products, { category: "Kính mát" })).toEqual([
    products[2],
  ]);
});
