import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

test.each([
  ["Kính mắt", "kinh-mat"],
  ["Kính mát", "kinh-ram"],
  ["Gọng kính", "gong-kinh"],
  ["Bác sĩ", "bac-si"],
  ["Đo mắt", "do-mat"],
  ["Cửa hàng", "cua-hang"],
])("provides the %s header subpage route", (_label, routePath) => {
  expect(existsSync(path.resolve(__dirname, routePath, "page.tsx"))).toBe(true);
});

test.each([
  ["doctor", path.resolve(__dirname, "bac-si", "page.tsx")],
  [
    "product category",
    path.resolve(__dirname, "..", "components", "marketing", "product-category-page.tsx"),
  ],
  [
    "eye exam",
    path.resolve(__dirname, "..", "components", "marketing", "eye-exam-page.tsx"),
  ],
  [
    "store locations",
    path.resolve(__dirname, "..", "components", "marketing", "store-locations-page.tsx"),
  ],
])("provides the global skip-link target on the %s page", (_page, filePath) => {
  expect(readFileSync(filePath, "utf8")).toMatch(/<main[^>]*id="main-content"/);
});
