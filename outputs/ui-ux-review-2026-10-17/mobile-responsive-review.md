# Mobile responsive review — 17 October 2026

Verified against the local production build at http://127.0.0.1:3000/.

## Changes

- Direct “Xem mẫu kính” link from the hero to the catalogue.
- Horizontal, snapping brand cards on narrow screens; all three remain accessible by keyboard.
- Search and brand selection stay visible; category, budget and sort expand on demand below 861px. Applying returns focus to the toggle.
- Mobile inputs use 16px text and at least 48px height. Removed inherited form layout and duplicated page padding.
- Mobile product pages have a bottom consultation bar, device safe-area padding and reserved footer space.
- Scrollable mobile menu fits landscape screens. Home section links also work when the destination arrives after the initial streamed HTML.

## Viewport checks

Full-page scroll passes generated 118 viewport captures, including repeat checks after fixes. Key layouts, forms, photographs and footers were visually reviewed.

| Viewport | Reached footer | Body horizontal overflow | Form columns | Small touch targets |
| --- | --- | --- | --- | --- |
| 320 × 568 | Yes | None | 1 | 0 |
| 375 × 667 | Yes | None | 1 | 0 |
| 414 × 896 | Yes | None | 1 | 0 |
| 667 × 375 | Yes | None | 1 | 0 |
| 768 × 1024 | Yes | None | 1 | 0 |
| 1024 × 768 | Yes | None | 3 | 0 |
| 1280 × 720 | Yes | None | 3 | Mouse layout |
| 1920 × 1080 | Yes | None | 3 | Mouse layout |

Touch target measurements cover rendered home buttons, links, inputs, selects and disclosures, excluding the offscreen skip link; minimum 44 × 44px. Intentional horizontal scrolling is confined to brand cards and brand buttons.

Also checked `/gong-kinh`, `/do-mat`, `/cua-hang`, `/bac-si`, `/bang-gia/exfash` and `/san-pham/parim-85006` at 375px: no body overflow or failed decoded images. Verified landscape menu scrolling, budget filtering, filter collapse/focus, alternate brand access, section deep links, and product contact bar clearance above the footer.

## Validation

- 74 tests passed across 22 files.
- Production build, TypeScript checks and `git diff --check` passed.
- Lighthouse mobile: performance **93**, accessibility **100**, best practices **100**, SEO **100**; throttled LCP 3.1s, CLS 0, TBT 10ms.
- Audit: `lighthouse-mobile-final.report.html`; screenshot: `homepage-mobile-final.jpg`.

Browser viewport simulation was used; physical iOS/Android devices and the native phone keyboard were not tested. Changes are available in the local preview; production was not deployed.
