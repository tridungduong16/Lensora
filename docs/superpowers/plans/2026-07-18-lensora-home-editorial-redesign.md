# Lensora Home Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the tabletop-video home page with a cohesive editorial-clinical storefront led by three local model images while preserving product filtering, navigation, and local appointment behavior.

**Architecture:** Keep `src/app/page.tsx` as the Server Component that owns URL parameters, data selection, and section composition. Add one small client-side `EditorialHero` for carousel state and update the existing header and form presentation without moving business logic into the browser. Use the global stylesheet for the shared editorial design system and responsive layout.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Framer Motion, CSS, Vitest, React Testing Library, Playwright browser QA.

## Global Constraints

- Follow `docs/superpowers/specs/2026-07-18-lensora-home-editorial-redesign-design.md` as the source of truth.
- Use local `model1.jpg`, `model2.png`, and `model3.jpg` for the hero; do not render the tabletop MP4.
- Keep `/`, existing section anchors, navigation destinations, URL-driven product filtering, store links, and local-only appointment confirmation behavior.
- Use warm ivory `#F3EFE7`, deep navy `#142A45`, and charcoal `#20201E`; no gradients or heavy shadows.
- Hero copy is exactly `Nhìn rõ hơn.` and `Đo mắt chuẩn y khoa với hơn 20 năm kinh nghiệm.`
- Hero CTA labels are exactly `Đặt lịch đo mắt` and `Xem bộ sưu tập`.
- Trust signals are exactly `★★★★★ 4.9`, `10.000+ khách hàng`, `20 năm kinh nghiệm`, and `100+ thương hiệu`.
- Respect `prefers-reduced-motion`, WCAG AA contrast, semantic headings, visible focus, and 44-by-44-pixel touch targets.
- Preserve user-owned working-tree changes that are outside the files and lines in this plan.

---

### Task 1: Produce the visual reference

**Files:**
- Read: `frontend/model1.jpg`
- Read: `frontend/model2.png`
- Read: `frontend/model3.jpg`
- Read: `frontend/src/app/page.tsx`
- Read: `frontend/src/app/globals.css`

**Interfaces:**
- Consumes: the approved design spec and local model photography.
- Produces: desktop concept images for the hero/trust area, commerce sections, and clinical/appointment/footer continuation.

- [ ] **Step 1: Generate the hero reference**

Use Image Gen with the three model images as the visual source and request a 1440-pixel desktop editorial eyewear header, 40/60 split, warm ivory left panel, model on the right, deep navy typography, approved copy, two CTAs, and the four trust signals. Require all text to stay outside the face and glasses.

- [ ] **Step 2: Generate the commerce reference**

Generate a coordinated desktop reference for the asymmetric three-collection composition and spacious four-product grid. Keep copy in dedicated ivory zones and use flat navy/charcoal dividers.

- [ ] **Step 3: Generate the clinical continuation reference**

Generate a coordinated desktop reference for the doctor-led eye-exam story, navy appointment form, asymmetric reviews, store section, and navy footer.

- [ ] **Step 4: Inspect the generated references**

Use `view_image` on every concept. Reject and regenerate any concept that overlays text on eyewear, invents extra hero copy, uses gradients/heavy shadows, or omits a requested section.

### Task 2: Build the editorial hero with TDD

**Files:**
- Create: `frontend/src/components/marketing/editorial-hero.tsx`
- Create: `frontend/src/components/marketing/editorial-hero.test.tsx`
- Modify: `frontend/src/app/page.tsx`
- Modify: `frontend/src/app/page.test.tsx`

**Interfaces:**
- Produces: `EditorialHero(): JSX.Element` with local slide state, five-and-a-half-second autoplay, previous/next controls, pause/play control, and reduced-motion-safe behavior.
- Consumes: `model1.jpg`, `model2.png`, `model3.jpg`, `next/image`, `next/link`, and Framer Motion.

- [ ] **Step 1: Replace the old home hero expectations with failing editorial expectations**

Use these assertions in `src/app/page.test.tsx`:

```tsx
test("renders the editorial home hero and trust proof", async () => {
  const { container } = render(await Home({ searchParams: Promise.resolve({}) }));

  expect(
    screen.getByRole("heading", { level: 1, name: "Nhìn rõ hơn." }),
  ).toBeInTheDocument();
  expect(
    screen.getByText("Đo mắt chuẩn y khoa với hơn 20 năm kinh nghiệm."),
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Đặt lịch đo mắt" })).toHaveAttribute(
    "href",
    "/#eye-exam",
  );
  expect(screen.getByRole("link", { name: /Xem bộ sưu tập/i })).toHaveAttribute(
    "href",
    "/#collections",
  );
  expect(screen.getByText("★★★★★ 4.9")).toBeInTheDocument();
  expect(screen.getByText("10.000+ khách hàng")).toBeInTheDocument();
  expect(screen.getByText("20 năm kinh nghiệm")).toBeInTheDocument();
  expect(screen.getByText("100+ thương hiệu")).toBeInTheDocument();
  expect(container.querySelector("video")).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run the home test and verify RED**

Run: `cd frontend && npm test -- --run src/app/page.test.tsx`

Expected: FAIL because the old video hero still renders and the approved heading, CTAs, and trust signals are absent.

- [ ] **Step 3: Write focused hero interaction tests**

Create `src/components/marketing/editorial-hero.test.tsx` with:

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EditorialHero } from "./editorial-hero";

test("moves to the next model with the explicit control", async () => {
  const user = userEvent.setup();
  render(<EditorialHero />);

  await user.click(screen.getByRole("button", { name: "Ảnh tiếp theo" }));

  expect(
    screen.getByRole("img", { name: /bộ sưu tập hiện đại/i }),
  ).toBeVisible();
  expect(screen.getByText("02 / 03")).toBeInTheDocument();
});

test("lets the visitor pause and resume automatic changes", async () => {
  const user = userEvent.setup();
  render(<EditorialHero />);

  await user.click(
    screen.getByRole("button", { name: "Tạm dừng chuyển ảnh" }),
  );
  expect(
    screen.getByRole("button", { name: "Tiếp tục chuyển ảnh" }),
  ).toBeInTheDocument();
});

test("skips an image that fails to load", () => {
  render(<EditorialHero />);
  fireEvent.error(
    screen.getByRole("img", { name: /phong cách tối giản/i }),
  );
  expect(
    screen.getByRole("img", { name: /bộ sưu tập hiện đại/i }),
  ).toBeVisible();
});
```

- [ ] **Step 4: Run the hero test and verify RED**

Run: `cd frontend && npm test -- --run src/components/marketing/editorial-hero.test.tsx`

Expected: FAIL because `./editorial-hero` does not exist.

- [ ] **Step 5: Implement the minimum complete hero**

Implement `EditorialHero` with this structure and behavior:

```tsx
"use client";

import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { type SyntheticEvent, useCallback, useEffect, useState } from "react";
import model1 from "../../../model1.jpg";
import model2 from "../../../model2.png";
import model3 from "../../../model3.jpg";

type HeroSlide = { src: StaticImageData; alt: string; position: string };

const slides: readonly HeroSlide[] = [
  { src: model1, alt: "Người mẫu đeo kính Anh Thi — phong cách tối giản", position: "center 35%" },
  { src: model2, alt: "Người mẫu đeo kính Anh Thi — bộ sưu tập hiện đại", position: "center 32%" },
  { src: model3, alt: "Người mẫu đeo kính Anh Thi — thiết kế cao cấp", position: "center 34%" },
];

const AUTOPLAY_MS = 5500;

export function EditorialHero() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [failedIndexes, setFailedIndexes] = useState<readonly number[]>([]);

  const findAvailable = useCallback((start: number, direction: 1 | -1) => {
    for (let offset = 1; offset <= slides.length; offset += 1) {
      const candidate = (start + direction * offset + slides.length) % slides.length;
      if (!failedIndexes.includes(candidate)) return candidate;
    }
    return start;
  }, [failedIndexes]);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => findAvailable(current, -1));
  }, [findAvailable]);
  const showNext = useCallback(() => {
    setActiveIndex((current) => findAvailable(current, 1));
  }, [findAvailable]);
  const togglePlayback = useCallback(() => {
    setIsPlaying((current) => !current);
  }, []);
  const handleImageError = useCallback((event: SyntheticEvent<HTMLImageElement>) => {
    const failedIndex = Number(event.currentTarget.dataset.slideIndex);
    setFailedIndexes((current) => current.includes(failedIndex) ? current : [...current, failedIndex]);
    setActiveIndex((current) => current === failedIndex ? (current + 1) % slides.length : current);
  }, []);

  useEffect(() => {
    if (reduceMotion || !isPlaying) return;
    const timer = window.setInterval(showNext, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [isPlaying, reduceMotion, showNext]);

  return (
    <section className="editorial-hero" aria-labelledby="page-title">
      <div className="editorial-hero__copy">
        <h1 id="page-title">Nhìn rõ hơn.</h1>
        <p>Đo mắt chuẩn y khoa với hơn 20 năm kinh nghiệm.</p>
        <div className="editorial-hero__actions">
          <Link className="primary-button" href="/#eye-exam">Đặt lịch đo mắt</Link>
          <Link className="text-button" href="/#collections">Xem bộ sưu tập <ArrowRight aria-hidden="true" size={18} /></Link>
        </div>
      </div>
      <div className="editorial-hero__media">
        {slides.map((slide, index) => (
          <motion.div className="editorial-hero__slide" aria-hidden={index !== activeIndex} key={slide.alt} animate={{ opacity: index === activeIndex ? 1 : 0, scale: index === activeIndex && !reduceMotion ? 1.02 : 1 }}>
            <Image alt={slide.alt} className="editorial-hero__image" data-slide-index={index} fill onError={handleImageError} priority={index === 0} sizes="(min-width: 861px) 60vw, 100vw" src={slide.src} style={{ objectPosition: slide.position }} />
          </motion.div>
        ))}
        <div className="editorial-hero__controls">
          <button aria-label="Ảnh trước" onClick={showPrevious} type="button"><ArrowLeft aria-hidden="true" /></button>
          <span>{String(activeIndex + 1).padStart(2, "0")} / 03</span>
          <button aria-label={isPlaying ? "Tạm dừng chuyển ảnh" : "Tiếp tục chuyển ảnh"} onClick={togglePlayback} type="button">{isPlaying ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}</button>
          <button aria-label="Ảnh tiếp theo" onClick={showNext} type="button"><ArrowRight aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  );
}
```

Keep all handlers stable as shown so the autoplay effect is cleaned up and restarted only when playback, reduced-motion state, or the available slide set changes. Do not change the public labels or timing.

- [ ] **Step 6: Render `EditorialHero` and concise trust signals from the server page**

Remove `HeroBackgroundVideo`, the old hero copy, icon-heavy trust data, and the video tint. Import and render `<EditorialHero />`; render the four exact trust strings in a `trust-strip` section immediately after it.

- [ ] **Step 7: Run hero and page tests and verify GREEN**

Run: `cd frontend && npm test -- --run src/components/marketing/editorial-hero.test.tsx src/app/page.test.tsx`

Expected: PASS for the new hero interactions, approved copy, links, proof, and absence of video.

### Task 3: Recompose the page and header with TDD

**Files:**
- Modify: `frontend/src/app/page.tsx`
- Modify: `frontend/src/app/page.test.tsx`
- Modify: `frontend/src/components/marketing/storefront-header.tsx`
- Modify: `frontend/src/components/marketing/storefront-header.test.tsx`
- Modify: `frontend/src/components/marketing/storefront-footer.tsx`

**Interfaces:**
- Consumes: existing `products`, `eyeServices`, `stores`, `reviews`, `featuredCollections`, `filterProducts`, `AppointmentForm`, and `StorefrontHeader` navigation props.
- Produces: asymmetric collection markup, editorial product section, doctor-led eye-exam story, navy appointment panel, asymmetric reviews, store actions, and expanded footer.

- [ ] **Step 1: Add failing structural expectations**

Append to `src/app/page.test.tsx`:

```tsx
test("connects the editorial sections to existing customer journeys", async () => {
  render(await Home({ searchParams: Promise.resolve({}) }));

  expect(screen.getByRole("heading", { level: 2, name: "Bộ sưu tập nổi bật" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 2, name: "Sản phẩm được yêu thích" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 2, name: "Đo mắt kỹ. Chọn kính đúng." })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Gặp gỡ bác sĩ Anh Thi" })).toHaveAttribute("href", "/bac-si");
  expect(screen.getByRole("heading", { level: 2, name: "Đặt lịch đo mắt" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 2, name: "Khách hàng nói gì" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 2, name: "Ghé Anh Thi" })).toBeInTheDocument();
});
```

Change the Testing Library import in `storefront-header.test.tsx` to `import { fireEvent, render, screen, within } from "@testing-library/react";`, then append:

```tsx
test("offers the appointment CTA on desktop and mobile", async () => {
  const user = userEvent.setup();
  render(<StorefrontHeader navItems={storefrontNavigation} />);

  expect(screen.getByRole("link", { name: "Đặt lịch đo mắt" })).toHaveAttribute(
    "href",
    "/#eye-exam",
  );
  await user.click(screen.getByRole("button", { name: "Mở menu" }));
  expect(
    within(screen.getByRole("navigation", { name: "Điều hướng trên di động" }))
      .getByRole("link", { name: "Đặt lịch đo mắt" }),
  ).toHaveAttribute("href", "/#eye-exam");
});

test("adds the scrolled surface to the overlay header", () => {
  render(<StorefrontHeader navItems={storefrontNavigation} overlay />);

  const header = screen.getByRole("banner");
  expect(header).toHaveClass("site-header--overlay");
  expect(header).not.toHaveClass("is-scrolled");

  Object.defineProperty(window, "scrollY", { configurable: true, value: 80 });
  fireEvent.scroll(window);

  expect(header).toHaveClass("is-scrolled");
});
```

- [ ] **Step 2: Run both tests and verify RED**

Run: `cd frontend && npm test -- --run src/app/page.test.tsx src/components/marketing/storefront-header.test.tsx`

Expected: FAIL because the new section headings, doctor link, and appointment CTAs do not yet exist.

- [ ] **Step 3: Recompose the server-rendered sections**

In `page.tsx`:

- Keep the existing filter calculation and product result states.
- Add `collection-card--featured` to the first collection and use a separate `collection-card__media`/`collection-card__content` structure.
- Wrap the eye-exam content in `clinical-story`; use `images/doctor-conference.jpg` as its editorial image and render the three existing `eyeServices` entries as numbered `01`, `02`, `03` process rows.
- Add the exact heading `Đo mắt kỹ. Chọn kính đúng.` and link `Gặp gỡ bác sĩ Anh Thi` to `/bac-si`.
- Move `<AppointmentForm />` into a sibling `appointment-panel` headed `Đặt lịch đo mắt`.
- Mark the first review with `review-card--featured` and render the remaining two in `review-stack`.
- Rename the locations heading to `Ghé Anh Thi`, retain map and booking links, and keep the current telephone contact.

- [ ] **Step 4: Add the overlay header state and appointment actions without changing navigation targets**

Extend `StorefrontHeaderProps` with `overlay?: boolean`, pass `overlay` only from the home page, and add `site-header--overlay` when enabled. Subscribe to the passive window `scroll` event, initialize from `window.scrollY`, add `is-scrolled` when `scrollY > 24`, and remove the listener in the effect cleanup. Render one desktop link with class `header-appointment` and one link inside the mobile navigation with class `mobile-appointment`, both with label `Đặt lịch đo mắt` and `href="/#eye-exam"`. Preserve the current menu toggle, balanced navigation, and close-on-navigation behavior.

- [ ] **Step 5: Expand the footer structure**

Render a `site-footer__brand`, `site-footer__navigation`, and `site-footer__meta` composition using only current navigation destinations, copyright, and the existing phone number. Do not invent social accounts or policy URLs.

- [ ] **Step 6: Run page, header, footer-adjacent, filter, and form tests and verify GREEN**

Run: `cd frontend && npm test -- --run src/app/page.test.tsx src/components/marketing/storefront-header.test.tsx src/components/marketing/appointment-form.test.tsx src/lib/product-filter.test.ts`

Expected: PASS with no React accessibility or key warnings.

### Task 4: Apply the editorial design system and responsive layouts

**Files:**
- Modify: `frontend/src/app/globals.css`
- Modify: `frontend/src/components/marketing/appointment-form.tsx`

**Interfaces:**
- Consumes: all class names introduced in Tasks 2 and 3.
- Produces: the accepted ivory/navy visual system, 40/60 desktop hero, asymmetric section layouts, navy appointment/footer surfaces, and polished mobile layouts.

- [ ] **Step 1: Replace the global color and spacing tokens**

Use:

```css
:root {
  --color-page: #f3efe7;
  --color-surface: #fffdf8;
  --color-text: #20201e;
  --color-navy: #142a45;
  --color-navy-soft: #243c59;
  --color-muted: #68645d;
  --color-border: #d9d1c5;
  --color-on-navy: #fffdf8;
  --page-gutter: clamp(20px, 4vw, 64px);
  --section-space: clamp(80px, 10vw, 144px);
}
```

Keep the existing spacing variables that are still referenced.

- [ ] **Step 2: Implement the header and hero layout**

Set the desktop header to 76 pixels with a 60-pixel logo and a navy appointment CTA. The normal header uses an ivory surface; `.site-header--overlay` is fixed and transparent at the top of the home hero, then `.site-header--overlay.is-scrolled` gains a translucent ivory surface, bottom border, and backdrop blur. Use a full-width `.editorial-hero` grid with `minmax(0, 2fr) minmax(0, 3fr)`, a left ivory copy panel, right overflow-hidden image field, display heading up to 96 pixels, and controls anchored below the image safe area. Ensure `aria-hidden` slides are not interactive and reduced-motion styles remove scale/transition effects.

- [ ] **Step 3: Implement the trust and commerce sections**

Make `.trust-strip__track` a four-column desktop row with separators and a mobile `overflow-x: auto; scroll-snap-type: x mandatory`. Use a 12-column asymmetric collection grid where the featured card spans seven columns and two secondary cards span five. Preserve a four-product desktop grid with larger image ratios and quiet metadata dividers.

- [ ] **Step 4: Implement the clinical, appointment, review, location, and footer sections**

Use a two-column clinical story with a stable image aspect ratio, numbered process rows, and no generic service cards. Give `.appointment-panel` and `.site-footer` deep navy surfaces with high-contrast inputs/buttons. Use a 7/5 review split and retain a clear one-column location card for the current store data.

- [ ] **Step 5: Update form chrome without behavior changes**

Keep the existing form markup and class names unchanged, including all names, labels, values, required attributes, submit copy, reset, and confirmation string. Style the existing `.appointment-form`, `.appointment-fields`, `.appointment-actions`, `.appointment-note`, and `.appointment-status` classes for the navy panel; inputs use transparent backgrounds, ivory text, and visible focus borders.

- [ ] **Step 6: Implement tablet and mobile behavior**

At 1100 pixels, hide desktop navigation and show the menu. At 860 pixels, stack hero copy before media, set a safe portrait image crop, use one-column clinical/appointment/review/store layouts, and keep two product columns. At 640 pixels, use one product column, one collection column, 20-pixel gutters, full-width primary CTAs, and page-level `overflow-x: clip`.

- [ ] **Step 7: Run automated validation**

Run: `cd frontend && npm test -- --run && npm run typecheck && npm run build`

Expected: all tests PASS, TypeScript exits 0, and the Next.js production build exits 0.

### Task 5: Browser fidelity and interaction verification

**Files:**
- Modify only files from Tasks 2–4 when a verified mismatch requires a repair.
- Remove temporary screenshots after comparison.

**Interfaces:**
- Consumes: the generated concept images and local Next.js route.
- Produces: a verified desktop/mobile implementation and a written fidelity ledger for final handoff.

- [ ] **Step 1: Start the production-like local app**

Run: `cd frontend && npm run dev`

Expected: Next.js reports a local URL and the root route returns 200.

- [ ] **Step 2: Verify the desktop render**

Use Playwright browser tooling at 1440 by 900. Capture the top viewport and downstream sections. Check exact hero copy, 40/60 split, image safe area, four proof items, asymmetric collections, four-product grid, clinical split, navy appointment panel, asymmetric reviews, store, and navy footer.

- [ ] **Step 3: Verify the mobile render**

Resize to 375 by 812. Verify the menu opens and closes, copy appears before the hero image, eyes and glasses remain visible, trust strip scrolls without page overflow, CTAs are at least 44 pixels, and every downstream section stacks cleanly.

- [ ] **Step 4: Exercise customer journeys**

Test previous/next and pause/play, mobile navigation, `/?query=titanium#bestsellers`, an empty result query, the doctor link, store map link presence, and local appointment confirmation. Inspect console and network output for relevant errors.

- [ ] **Step 5: Compare concept and render with `view_image`**

Inspect the accepted concepts and latest desktop/mobile screenshots. Record at least five comparison points covering copy, layout, typography, palette, image crop, spacing, controls, and responsive behavior. Repair every fixable mismatch and repeat screenshots until no agency-signoff issue remains.

- [ ] **Step 6: Run final verification from a clean command invocation**

Run: `cd frontend && npm test -- --run && npm run typecheck && npm run build`

Expected: all commands exit 0 with no failing tests or type/build errors.
