import { readFileSync } from "node:fs";

const css = readFileSync("src/app/globals.css", "utf8");

test("uses a stable viewport and immediate mobile trust proof", () => {
  expect(css).toMatch(/\.editorial-hero\s*\{[^}]*min-height:\s*100dvh/);
  expect(css).toMatch(
    /@media \(max-width: 860px\)[\s\S]*?\.trust-strip__track\s*\{[^}]*grid-template-columns:\s*repeat\(2,/,
  );
  expect(css).not.toMatch(
    /\.trust-strip__track\s*\{[^}]*overflow-x:\s*auto/,
  );
});

test("keeps product discovery dense until narrow mobile widths", () => {
  expect(css).toMatch(
    /@media \(max-width: 389px\)[\s\S]*?\.product-grid\s*\{[^}]*grid-template-columns:\s*1fr/,
  );
});

test("defines tactile and active interaction states", () => {
  expect(css).toContain('.desktop-nav a[aria-current="page"]');
  expect(css).toMatch(
    /\.primary-button:active[\s\S]*?transform:\s*translateY\(1px\)/,
  );
});
