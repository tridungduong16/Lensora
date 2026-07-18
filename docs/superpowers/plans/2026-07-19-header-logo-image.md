# Lensora Header Logo Image Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the centered header text wordmark with the supplied transparent circular Anh Thi logo without changing navigation structure, header height, or accessibility.

**Architecture:** Keep `StorefrontHeader` as the existing client component and statically import `frontend/logo.jpg` through `next/image`. The named home link remains the accessibility boundary, while a decorative image and two responsive CSS sizes provide the visual treatment.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, native CSS, Vitest, React Testing Library, Playwright CLI.

## Global Constraints

- Use the complete transparent circular logo from `frontend/logo.jpg`.
- Render the logo at 58 by 58 pixels on desktop and 48 by 48 pixels at viewport widths up to 1100 pixels.
- Preserve the 76-pixel desktop and 72-pixel mobile header heights.
- Preserve the brand link accessible name `Trang chủ Kính thuốc Anh Thi` and its minimum 44-pixel target.
- Remove only the header text wordmark; keep footer branding unchanged.
- Add no runtime dependency, animation, background, border, radius, or shadow.
- Preserve all unrelated user-owned working-tree changes.

---

### Task 1: Render the supplied logo in the centered header brand link

**Files:**
- Modify: `frontend/src/components/marketing/storefront-header.test.tsx`
- Modify: `frontend/src/components/marketing/storefront-header.tsx`
- Modify: `frontend/src/app/globals-css.test.ts`
- Modify: `frontend/src/app/globals.css`

**Interfaces:**
- Consumes: static image asset `frontend/logo.jpg`; existing `.brand` link and `StorefrontHeaderProps`.
- Produces: decorative `.brand-logo` image within the existing named home link.

- [ ] **Step 1: Write failing component and CSS contract tests**

Append to `storefront-header.test.tsx`:

```tsx
test("renders the supplied logo image instead of the header text wordmark", () => {
  render(<StorefrontHeader navItems={storefrontNavigation} />);

  const brandLink = screen.getByRole("link", {
    name: "Trang chủ Kính thuốc Anh Thi",
  });
  expect(brandLink.querySelector("img.brand-logo")).toBeInTheDocument();
  expect(brandLink).not.toHaveTextContent("ANH THI");
  expect(brandLink).not.toHaveTextContent("EYEGLASSES");
});
```

Append to `globals-css.test.ts`:

```ts
test("sizes the centered logo without changing the header height", () => {
  expect(css).toMatch(/\.brand-logo\s*\{[^}]*width:\s*58px[^}]*height:\s*58px/);
  expect(css).toMatch(
    /@media \(max-width: 1100px\)[\s\S]*?\.brand-logo\s*\{[^}]*width:\s*48px[^}]*height:\s*48px/,
  );
});
```

- [ ] **Step 2: Run the targeted tests and verify RED**

Run:

```bash
cd frontend
npm test -- --run src/components/marketing/storefront-header.test.tsx src/app/globals-css.test.ts
```

Expected: FAIL because `.brand-logo` does not exist and the header still renders text spans.

- [ ] **Step 3: Implement the minimal logo image treatment**

Update the imports and brand link in `storefront-header.tsx`:

```tsx
import Image from "next/image";
import brandLogo from "../../../logo.jpg";

<Link className="brand" href="/" aria-label="Trang chủ Kính thuốc Anh Thi">
  <Image
    alt=""
    className="brand-logo"
    height={58}
    priority
    sizes="(max-width: 1100px) 48px, 58px"
    src={brandLogo}
    width={58}
  />
</Link>
```

Replace the obsolete wordmark rules and add the responsive override in `globals.css`:

```css
.brand-logo {
  width: 58px;
  height: 58px;
  object-fit: contain;
}

@media (max-width: 1100px) {
  .brand-logo {
    width: 48px;
    height: 48px;
  }
}
```

- [ ] **Step 4: Run targeted tests and verify GREEN**

Run:

```bash
cd frontend
npm test -- --run src/components/marketing/storefront-header.test.tsx src/app/globals-css.test.ts
```

Expected: both test files pass.

- [ ] **Step 5: Run full verification and rendered QA**

Run:

```bash
cd frontend
npm test -- --run
npm run typecheck
npm run build
```

Then inspect `/` at 1280 by 720 and 375 by 667 with Playwright. Verify the logo is centered, uncropped, 58/48 pixels, the header remains 76/72 pixels, navigation remains one line on desktop, and there is no horizontal overflow.

- [ ] **Step 6: Commit the implementation**

```bash
git add frontend/src/components/marketing/storefront-header.test.tsx frontend/src/components/marketing/storefront-header.tsx frontend/src/app/globals-css.test.ts frontend/src/app/globals.css
git commit -m "feat: use brand logo in storefront header"
```
