# Lensora Home UX Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make product discovery, mobile navigation, and appointment booking on the Lensora home page responsive and usable while aligning the page with its gallery-retail design system.

**Architecture:** Keep content and URL-driven product filtering in the server `page.tsx`. Move only interaction state into small client components: a header menu, local appointment confirmation, and the existing carousel. CSS owns all visual and responsive behaviour through the existing global stylesheet.

**Tech Stack:** Next.js 15, React 19, TypeScript, CSS, Framer Motion, Vitest, React Testing Library.

## Global Constraints

- Preserve the single-route `/` storefront and existing local model assets.
- Use Next `Link` for internal navigation and `next/image` for local responsive images.
- Do not add a backend, API route, cart, checkout, or persistence.
- Use only monochrome gallery-retail tokens: `#ffffff`, `#222222`, `#727272`, `#e6e6e6`, and `#f5f5f5`.
- Keep controls square, shadow-free, and at least 44px high on touch viewports.
- Do not add mockups or generated assets.

---

### Task 1: Add a focused frontend test harness

**Files:**
- Modify: `frontend/package.json`
- Modify: `frontend/package-lock.json`
- Create: `frontend/vitest.config.ts`
- Create: `frontend/src/test/setup.ts`

**Interfaces:**
- Produces: `npm test` runs `*.test.tsx` under `frontend/src` in a jsdom environment.

- [x] **Step 1: Add Vitest and Testing Library development dependencies, a `test` script, and this config.**

```ts
// vitest.config.ts
import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  test: { environment: "jsdom", globals: true, passWithNoTests: true, setupFiles: ["./src/test/setup.ts"] },
});
```

```ts
// src/test/setup.ts
import "@testing-library/jest-dom/vitest";
```

- [x] **Step 2: Run the empty test suite to confirm the harness starts.**

Run: `npm test -- --run`

Expected: PASS with no tests found, not a Vitest configuration error.

- [x] **Step 3: Add the failing interaction tests described in Tasks 2 and 3.**

- [x] **Step 4: Run the tests to verify they fail because the client components do not exist.**

Run: `npm test -- --run`

Expected: FAIL with module-resolution errors for `storefront-header` and `appointment-form`.

### Task 2: Build accessible navigation and local booking feedback

**Files:**
- Create: `frontend/src/components/marketing/storefront-header.tsx`
- Create: `frontend/src/components/marketing/appointment-form.tsx`
- Create: `frontend/src/components/marketing/storefront-header.test.tsx`
- Create: `frontend/src/components/marketing/appointment-form.test.tsx`
- Modify: `frontend/src/app/page.tsx`
- Modify: `frontend/src/app/globals.css`

**Interfaces:**
- Consumes: `{ label: string; href: string }[]` navigation links.
- Produces: `<StorefrontHeader navItems={navItems} />` and `<AppointmentForm />`.

- [x] **Step 1: Write the failing tests.**

```tsx
test("opens and closes the mobile navigation", async () => {
  const user = userEvent.setup();
  render(<StorefrontHeader navItems={[{ label: "Đo mắt", href: "#eye-exam" }]} />);
  await user.click(screen.getByRole("button", { name: "Mở menu" }));
  expect(screen.getByRole("navigation", { name: "Điều hướng trên di động" })).toBeVisible();
  await user.click(screen.getByRole("button", { name: "Đóng menu" }));
  expect(screen.queryByRole("navigation", { name: "Điều hướng trên di động" })).not.toBeInTheDocument();
});

test("confirms a local appointment request", async () => {
  const user = userEvent.setup();
  render(<AppointmentForm />);
  await user.type(screen.getByLabelText("Họ và tên"), "Nguyễn Anh");
  await user.type(screen.getByLabelText("Số điện thoại"), "0900 000 000");
  await user.click(screen.getByRole("button", { name: "Gửi yêu cầu đặt lịch" }));
  expect(screen.getByRole("status")).toHaveTextContent("Anh Thi sẽ liên hệ lại để xác nhận lịch hẹn.");
});
```

- [x] **Step 2: Run tests and verify they fail for missing components.**

Run: `npm test -- --run`

Expected: FAIL because the components have not been implemented.

- [x] **Step 3: Implement the smallest components that pass the tests.**

`StorefrontHeader` uses a `useState(false)` menu flag, a native GET search form named `query`, and a mobile `<nav>` rendered only while open. `AppointmentForm` prevents default submission, sets a local `submitted` flag, and renders a `role="status"` message.

- [x] **Step 4: Replace the current header and appointment markup in `page.tsx`; add menu, search, status, focus, and responsive rules to `globals.css`.**

- [x] **Step 5: Run the component tests.**

Run: `npm test -- --run src/components/marketing/storefront-header.test.tsx src/components/marketing/appointment-form.test.tsx`

Expected: PASS, 2 tests.

### Task 3: Make catalogue discovery and the hero controls useful

**Files:**
- Modify: `frontend/src/app/page.tsx`
- Modify: `frontend/src/components/marketing/hero-carousel.tsx`
- Create: `frontend/src/components/marketing/hero-carousel.test.tsx`
- Create: `frontend/src/lib/product-filter.ts`
- Create: `frontend/src/lib/product-filter.test.ts`
- Modify: `frontend/src/app/globals.css`

**Interfaces:**
- Consumes: URL `query` and `category` parameters and the local product data.
- Produces: filtered product cards, a result-count status, category reset link, and carousel dot buttons.

- [x] **Step 1: Write the failing carousel test.**

```tsx
test("shows the selected slide after choosing its control", async () => {
  const user = userEvent.setup();
  render(<HeroCarousel />);
  await user.click(screen.getByRole("button", { name: "Xem ảnh 2" }));
  expect(screen.getByRole("img", { name: /bộ sưu tập hiện đại/i })).toBeVisible();
});
```

- [x] **Step 2: Run the test to verify that it fails because carousel controls are not buttons.**

Run: `npm test -- --run src/components/marketing/hero-carousel.test.tsx`

Expected: FAIL because no button named `Xem ảnh 2` exists.

- [x] **Step 3: Add button controls and reduced-motion-safe autoplay to `HeroCarousel`.**

Use button `aria-label`s `Xem ảnh 1`, `Xem ảnh 2`, and `Xem ảnh 3`; set `aria-pressed` for the selected slide. Keep the first local image as the priority image and do not load new assets.

- [x] **Step 4: Write a failing `filterProducts` test for a case-insensitive query and exact category.**

```ts
expect(filterProducts(products, { query: "titanium" })).toHaveLength(1);
expect(filterProducts(products, { category: "Kính mát" })).toHaveLength(1);
```

- [x] **Step 5: Implement `filterProducts` in `src/lib/product-filter.ts` and run its test.**

Run: `npm test -- --run src/lib/product-filter.test.ts`

Expected: PASS, 2 tests.

- [x] **Step 6: Read `query` and `category` in `page.tsx`, pass them to `filterProducts`, and render a concise result status and reset `Link` only when filters are active.**

- [x] **Step 7: Use category-specific `Link` targets in the header and ensure the empty result state directs the user back to all products.**

- [x] **Step 8: Run the carousel and filter tests.**

Run: `npm test -- --run src/components/marketing/hero-carousel.test.tsx src/lib/product-filter.test.ts`

Expected: PASS, 3 tests.

### Task 4: Apply the responsive gallery-retail presentation

**Files:**
- Modify: `frontend/src/app/globals.css`
- Modify: `frontend/src/app/page.tsx`

**Interfaces:**
- Consumes: the page and client component class names from Tasks 2 and 3.
- Produces: no horizontal overflow at 375px; 1/2/3/4-column grids according to the global constraints.

- [x] **Step 1: Replace warm palette tokens with the documented monochrome tokens and define the missing `--spacing-20: 20px` token.**

- [x] **Step 2: Preserve desktop grids through 1100px, use two columns from 641px through 1100px, and use a single column at 640px and below.**

- [x] **Step 3: Make the mobile header two columns (`brand`, `menu`), move search into the opened navigation panel, and set main/header gutters to 16px.**

- [x] **Step 4: Remove decorative English eyebrows and correct the optical-process copy to “khúc xạ – nhãn khoa”.**

- [x] **Step 5: Run build and type validation.**

Run: `npm run typecheck && npm run build`

Expected: both commands exit 0.

### Task 5: Validate the rendered experience

**Files:**
- No repository files.

- [x] **Step 1: Run all component tests.**

Run: `npm test -- --run`

Expected: PASS, 5 tests.

- [x] **Step 2: Validate the local page in the Browser plugin at 1280×720, 1024×768, 768×1024, 414×896, and 375×667.**

Check: home route renders; the page width does not exceed the viewport; grid transitions are 4/2/2/1/1 respectively; all controls are visible and the mobile menu opens.

- [x] **Step 3: Exercise `/?query=titanium#bestsellers`, an empty query, the mobile menu, a carousel slide selection, and the appointment confirmation.**

Check: each interaction has a visible state change and no relevant console errors.

- [x] **Step 4: Capture desktop and 375px screenshots, then compare hierarchy, palette, typography, control size, spacing, and responsive overflow against the design document.**
