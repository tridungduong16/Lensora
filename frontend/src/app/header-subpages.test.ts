import { existsSync } from "node:fs";
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
