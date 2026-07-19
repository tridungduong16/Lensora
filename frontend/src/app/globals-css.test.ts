import { readFileSync } from "node:fs";

const css = readFileSync("src/app/globals.css", "utf8");

test("uses a stable viewport and immediate mobile trust proof", () => {
  expect(css).toMatch(
    /\.editorial-hero\s*\{[^}]*min-height:\s*clamp\(640px,\s*86dvh,\s*800px\)/,
  );
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

test("sizes the centered logo without changing the header height", () => {
  expect(css).toMatch(/\.brand-logo\s*\{[^}]*width:\s*58px[^}]*height:\s*58px/);
  expect(css).toMatch(
    /@media \(max-width: 1100px\)[\s\S]*?\.brand-logo\s*\{[^}]*width:\s*48px[^}]*height:\s*48px/,
  );
  expect(css).toMatch(
    /@media \(max-width: 1100px\)[\s\S]*?\.desktop-navigation\s*\{[^}]*position:\s*absolute[^}]*top:\s*50%[^}]*left:\s*50%[^}]*display:\s*block[^}]*width:\s*auto[^}]*transform:\s*translate\(-50%,\s*-50%\)/,
  );
});

test("keeps hero imagery less tightly cropped", () => {
  expect(css).toMatch(
    /\.editorial-hero\s*\{[^}]*grid-template-columns:\s*minmax\(410px,\s*0\.96fr\)\s*minmax\(0,\s*1fr\)/,
  );
  expect(css).toMatch(
    /\.editorial-hero__copy\s*\{[^}]*padding:\s*132px\s*max\(var\(--page-gutter\),\s*calc\(\(100vw - 1360px\) \/ 2 \+ 48px\)\)\s*72px\s*max\(var\(--page-gutter\),\s*calc\(\(100vw - 1360px\) \/ 2 \+ 72px\)\)/,
  );
  expect(css).toMatch(
    /\.editorial-hero__slide\s*\{[^}]*inset:\s*112px\s*clamp\(64px,\s*6vw,\s*96px\)\s*48px\s*clamp\(16px,\s*2vw,\s*28px\)/,
  );
  expect(css).toMatch(
    /\.editorial-hero__image--one,[\s\S]*?\.editorial-hero__image--three\s*\{[^}]*width:\s*120%[^}]*object-position:\s*100%\s*42%[^}]*transform:\s*translateX\(-16%\)/,
  );
  expect(css).toMatch(
    /\.editorial-hero__image--two\s*\{[^}]*width:\s*108%[^}]*transform:\s*translateX\(-6%\)/,
  );
  expect(css).toMatch(
    /\.editorial-hero__controls\s*\{[^}]*right:\s*clamp\(64px,\s*6vw,\s*96px\)/,
  );
  expect(css).toMatch(
    /@media \(max-width: 860px\)[\s\S]*?\.editorial-hero__copy\s*\{[^}]*padding:\s*84px\s*28px\s*18px/,
  );
  expect(css).toMatch(
    /@media \(max-width: 860px\)[\s\S]*?\.editorial-hero__slide\s*\{[^}]*inset:\s*16px\s*28px\s*20px/,
  );
  expect(css).toMatch(
    /@media \(max-width: 860px\)[\s\S]*?\.editorial-hero__image\s*\{[^}]*transform:\s*scale\(0\.84\)/,
  );
  expect(css).toMatch(
    /@media \(max-width: 860px\)[\s\S]*?\.editorial-hero__image--two\s*\{[^}]*width:\s*112%[^}]*transform:\s*translateX\(-8%\)\s*scale\(0\.84\)/,
  );
});

test("allows the longer hero headline to wrap cleanly", () => {
  expect(css).toMatch(
    /\.editorial-hero__copy h1\s*\{[^}]*max-width:\s*16ch[^}]*font-size:\s*46px[^}]*font-weight:\s*600[^}]*line-height:\s*1\.15[^}]*letter-spacing:\s*0[^}]*white-space:\s*normal/,
  );
  expect(css).toMatch(
    /@media \(max-width: 860px\)[\s\S]*?\.editorial-hero__copy h1\s*\{[^}]*max-width:\s*15ch[^}]*font-size:\s*30px/,
  );
});
