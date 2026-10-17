import { existsSync } from "node:fs";
import path from "node:path";
import { eyewearProducts, getEyewearProduct } from "./eyewear-catalog";
import { filterProducts } from "./product-filter";

test("ships each researched product with source provenance and working local images", () => {
  expect(new Set(eyewearProducts.map((item) => item.slug)).size).toBe(12);
  for (const brand of ["PARIM", "EXFASH", "New Balance"]) {
    expect(eyewearProducts.filter((item) => item.brand === brand)).toHaveLength(
      4,
    );
  }
  for (const product of eyewearProducts) {
    expect(product.sourceUrl).toMatch(
      /^https:\/\/(matkinhtamduc|matkinhshady)\.com\//,
    );
    expect(Number.isInteger(product.priceValue) && product.priceValue > 0).toBe(
      true,
    );
    expect(product.images).toHaveLength(2);
    for (const image of product.images)
      expect(existsSync(path.join(process.cwd(), "public", image.src))).toBe(
        true,
      );
  }
});

test("finds frame models through accented and unaccented queries", () => {
  expect(
    filterProducts(eyewearProducts, {
      query: "nhua ultem",
      brand: "EXFASH",
    }).map((item) => item.model),
  ).toEqual(["EF69473"]);
  expect(
    filterProducts(eyewearProducts, { category: "Kính mắt" }),
  ).toHaveLength(9);
  expect(getEyewearProduct("missing-model")).toBeUndefined();
});
