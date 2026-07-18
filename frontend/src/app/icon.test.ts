import { existsSync } from "node:fs";
import path from "node:path";

test("provides an App Router icon for browser favicon requests", () => {
  expect(existsSync(path.resolve(__dirname, "icon.png"))).toBe(true);
});
