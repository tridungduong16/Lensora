import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { eyewearProducts, getEyewearProduct } from "./eyewear-catalog";
import { filterProducts } from "./product-filter";

test("uses every owner photograph once with working local optimized assets", () => {
  expect(new Set(eyewearProducts.map((item) => item.slug)).size).toBe(13);
  const usedPhotos: string[] = [];
  for (const product of eyewearProducts) {
    expect(product.sourceName).toBe("Kính thuốc Anh Thi");
    expect(product.priceValue === null || (Number.isInteger(product.priceValue) && product.priceValue > 0)).toBe(true);
    expect(product.images.length).toBeGreaterThan(0);
    for (const image of product.images) {
      expect(image.src).toMatch(/^\/images\/collections\/.+\.webp$/);
      expect(existsSync(path.join(process.cwd(), "public", image.src))).toBe(
        true,
      );
      expect(existsSync(path.resolve(process.cwd(), "..", image.sourceFile))).toBe(true);
      usedPhotos.push(path.basename(image.sourceFile));
    }
  }
  const supplied = readdirSync(path.resolve(process.cwd(), "../eyeglassed_collections")).filter((file) => file.endsWith(".jpg")).sort();
  expect(usedPhotos.sort()).toEqual(supplied);
  expect(new Set(usedPhotos).size).toBe(38);
});

test("finds frame models through accented and unaccented queries", () => {
  expect(
    filterProducts(eyewearProducts, {
      query: "nhua tr90",
      brand: "EXFASH",
    }).map((item) => item.model),
  ).toEqual(["EF45402", "Gọng chữ nhật chuyển màu"]);
  expect(
    filterProducts(eyewearProducts, { category: "Kính mắt" }),
  ).toHaveLength(13);
  expect(getEyewearProduct("missing-model")).toBeUndefined();
});
