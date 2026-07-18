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

test("keeps the mobile brand link large enough to tap", () => {
  expect(css).toMatch(/\.brand\s*\{[^}]*min-height:\s*44px/);
});

test("keeps keyboard focus visible on navy surfaces", () => {
  expect(css).not.toMatch(
    /\.appointment-form input,[\s\S]*?\.appointment-form select\s*\{[^}]*outline:\s*0/,
  );
  expect(css).toMatch(
    /\.appointment-form input:focus-visible,[\s\S]*?\.appointment-form select:focus-visible\s*\{[^}]*outline:\s*2px solid var\(--color-on-navy\)/,
  );
  expect(css).toContain(".appointment-panel :focus-visible");
  expect(css).toContain(".site-footer a:focus-visible");
});
