import { existsSync } from "node:fs";
import path from "node:path";

test("provides the /bac-si App Router page", () => {
  expect(existsSync(path.resolve(__dirname, "page.tsx"))).toBe(true);
});

test.each([
  "doctor-hong-kong.jpg",
  "doctor-national-conference-2012.jpg",
])("includes the supplied doctor photograph %s", (fileName) => {
  expect(existsSync(path.resolve(process.cwd(), "images", fileName))).toBe(true);
});
