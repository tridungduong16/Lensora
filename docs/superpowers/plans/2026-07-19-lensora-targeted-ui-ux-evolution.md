# Lensora Targeted UI/UX Evolution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the existing Lensora editorial-clinical storefront with distinctive Vietnamese typography, clearer mobile hierarchy, better product and booking journeys, and complete accessible interaction states while preserving routes and behavior.

**Architecture:** Keep `src/app/page.tsx` as the Server Component for URL-driven product selection and content composition. Keep interaction state isolated in the existing header, editorial hero, and appointment Client Components. Use `next/font`, existing Framer Motion, and the global CSS token system; add no runtime dependency or global state.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4 import plus native CSS, Framer Motion 12, Vitest 4, React Testing Library.

## Global Constraints

- Follow `docs/superpowers/specs/2026-07-19-lensora-targeted-ui-ux-evolution-design.md` as the source of truth.
- Preserve `/`, all route slugs, primary navigation labels, home anchors, logo treatment, form field names/order, URL filters, product prices, store data, and medical claims.
- Keep the existing light editorial theme: ivory `#F3EFE7`, navy `#142A45`, charcoal `#20201E`, square geometry, no shadows, and no gradients.
- Use `Be Vietnam Pro` for UI/body and `Lora` for editorial headings through `next/font/google`.
- Use navy as the only accent color.
- Keep controls at least 44 by 44 pixels and meet WCAG AA contrast.
- Use no em-dash or en-dash characters in visible copy or alt text.
- Use only transform and opacity for animation and respect `prefers-reduced-motion`.
- Add no runtime dependency, backend, API route, cart, checkout, product detail, or persistence.
- Preserve user-owned working-tree changes outside the exact files and lines named in this plan.

---

### Task 1: Install the typography foundation and skip navigation

**Files:**
- Modify: `frontend/src/test/setup.ts`
- Modify: `frontend/src/app/layout.test.tsx`
- Modify: `frontend/src/app/layout.tsx`
- Modify: `frontend/src/app/globals.css`

**Interfaces:**
- Produces: CSS variables `--font-be-vietnam` and `--font-lora`; document skip link targeting `#main-content`.
- Consumes: built-in `next/font/google` exports `Be_Vietnam_Pro` and `Lora`.

- [ ] **Step 1: Add font mocks and write the failing layout test**

Append this mock to `src/test/setup.ts`:

```ts
vi.mock("next/font/google", () => ({
  Be_Vietnam_Pro: () => ({ variable: "font-ui-variable" }),
  Lora: () => ({ variable: "font-editorial-variable" }),
}));
```

Replace `src/app/layout.test.tsx` with:

```tsx
import { render, screen } from "@testing-library/react";
import RootLayout from "./layout";

test("declares document behavior, brand fonts, and skip navigation", () => {
  const layout = RootLayout({ children: <main id="main-content" /> });

  expect(layout.props["data-scroll-behavior"]).toBe("smooth");
  expect(layout.props.className).toContain("font-ui-variable");
  expect(layout.props.className).toContain("font-editorial-variable");

  render(layout.props.children);
  expect(screen.getByRole("link", { name: "Bỏ qua đến nội dung chính" })).toHaveAttribute(
    "href",
    "#main-content",
  );
});
```

- [ ] **Step 2: Run the layout test and verify RED**

Run: `cd frontend && npm test -- --run src/app/layout.test.tsx`

Expected: FAIL because the document has no font variables or skip link.

- [ ] **Step 3: Configure fonts and skip navigation**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Be_Vietnam_Pro, Lora } from "next/font/google";
import "./globals.css";

const uiFont = Be_Vietnam_Pro({
  display: "swap",
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam",
  weight: ["400", "500", "600", "700"],
});

const editorialFont = Lora({
  display: "swap",
  subsets: ["latin", "vietnamese"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kính thuốc Anh Thi | Kính thuốc, kính mát và gọng kính",
  description:
    "Kính thuốc Anh Thi cung cấp gọng kính, kính thuốc, kính mát và dịch vụ đo mắt với phong cách mua sắm tối giản, rõ ràng.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={`${uiFont.variable} ${editorialFont.variable}`}
      data-scroll-behavior="smooth"
      lang="vi"
    >
      <body>
        <a className="skip-link" href="#main-content">
          Bỏ qua đến nội dung chính
        </a>
        {children}
      </body>
    </html>
  );
}
```

Update the font tokens and add the skip-link rules in `src/app/globals.css`:

```css
:root {
  --font-storefront: var(--font-be-vietnam), ui-sans-serif, system-ui, sans-serif;
  --font-editorial: var(--font-lora), Georgia, serif;
}

.skip-link {
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 60;
  padding: 12px 16px;
  color: var(--color-on-navy);
  background: var(--color-navy);
  transform: translateY(-160%);
  transition: transform 180ms ease;
}

.skip-link:focus-visible {
  outline-color: var(--color-on-navy);
  transform: translateY(0);
}
```

- [ ] **Step 4: Run the layout test and verify GREEN**

Run: `cd frontend && npm test -- --run src/app/layout.test.tsx`

Expected: PASS, 1 test.

- [ ] **Step 5: Commit the typography foundation**

```bash
git add frontend/src/test/setup.ts frontend/src/app/layout.test.tsx frontend/src/app/layout.tsx frontend/src/app/globals.css
git commit -m "feat: add Lensora typography foundation"
```

---

### Task 2: Make header state discrete, accessible, and route-aware

**Files:**
- Modify: `frontend/src/components/marketing/storefront-header.test.tsx`
- Modify: `frontend/src/components/marketing/storefront-header.tsx`
- Modify: `frontend/src/app/globals.css`

**Interfaces:**
- Consumes: `NavigationItem[]`, `overlay?: boolean`, `usePathname()`, `.editorial-hero` DOM boundary.
- Produces: active links with `aria-current="page"`, Escape-to-close, body scroll lock, and an `IntersectionObserver`-driven `is-scrolled` class.

- [ ] **Step 1: Replace the scroll-event test and add failing interaction tests**

At the top of `storefront-header.test.tsx`, add:

```tsx
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, vi } from "vitest";

const navigationState = vi.hoisted(() => ({ pathname: "/" }));

vi.mock("next/navigation", () => ({
  usePathname: () => navigationState.pathname,
}));

let intersectionCallback: IntersectionObserverCallback;

class IntersectionObserverMock {
  disconnect = vi.fn();
  observe = vi.fn();
  unobserve = vi.fn();

  constructor(callback: IntersectionObserverCallback) {
    intersectionCallback = callback;
  }
}

afterEach(() => {
  navigationState.pathname = "/";
  document.body.style.overflow = "";
  vi.unstubAllGlobals();
});
```

Replace the old `adds the scrolled surface` test and append these tests:

```tsx
test("changes the overlay surface when the hero leaves the viewport", () => {
  vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
  const hero = document.createElement("section");
  hero.className = "editorial-hero";
  document.body.append(hero);

  render(<StorefrontHeader navItems={storefrontNavigation} overlay />);
  const header = screen.getByRole("banner");

  act(() => {
    intersectionCallback([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver);
  });

  expect(header).toHaveClass("is-scrolled");
  hero.remove();
});

test("marks the current route in desktop and mobile navigation", async () => {
  navigationState.pathname = "/bac-si";
  const user = userEvent.setup();
  render(<StorefrontHeader navItems={storefrontNavigation} />);

  expect(
    within(screen.getByRole("navigation", { name: "Điều hướng chính bên phải" })).getByRole(
      "link",
      { name: "Bác sĩ" },
    ),
  ).toHaveAttribute("aria-current", "page");

  await user.click(screen.getByRole("button", { name: "Mở menu" }));
  expect(
    within(screen.getByRole("navigation", { name: "Điều hướng trên di động" })).getByRole(
      "link",
      { name: "Bác sĩ" },
    ),
  ).toHaveAttribute("aria-current", "page");
});

test("locks page scrolling and closes the mobile menu with Escape", async () => {
  const user = userEvent.setup();
  render(<StorefrontHeader navItems={storefrontNavigation} />);

  await user.click(screen.getByRole("button", { name: "Mở menu" }));
  expect(document.body.style.overflow).toBe("hidden");

  fireEvent.keyDown(document, { key: "Escape" });
  expect(screen.queryByRole("navigation", { name: "Điều hướng trên di động" })).not.toBeInTheDocument();
  expect(document.body.style.overflow).toBe("");
});
```

- [ ] **Step 2: Run the header test and verify RED**

Run: `cd frontend && npm test -- --run src/components/marketing/storefront-header.test.tsx`

Expected: FAIL because the component still uses `window.scroll`, has no `aria-current`, and does not lock scrolling or handle Escape.

- [ ] **Step 3: Implement discrete header state and accessible menu behavior**

In `storefront-header.tsx`:

```tsx
import { usePathname } from "next/navigation";
```

Inside `StorefrontHeader`, add `const pathname = usePathname();`, then replace the existing overlay effect with:

```tsx
useEffect(() => {
  if (!overlay || typeof IntersectionObserver === "undefined") return;

  const hero = document.querySelector(".editorial-hero");
  if (!hero) return;

  const observer = new IntersectionObserver(
    ([entry]) => setIsScrolled(!entry.isIntersecting),
    { threshold: 0.08 },
  );

  observer.observe(hero);
  return () => observer.disconnect();
}, [overlay]);

useEffect(() => {
  if (!isMenuOpen) return;

  const previousOverflow = document.body.style.overflow;
  const closeOnEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") closeMenu();
  };

  document.body.style.overflow = "hidden";
  document.addEventListener("keydown", closeOnEscape);

  return () => {
    document.body.style.overflow = previousOverflow;
    document.removeEventListener("keydown", closeOnEscape);
  };
}, [closeMenu, isMenuOpen]);
```

Add this helper inside the component:

```tsx
const currentPage = (href: string) => pathname === href;
```

Apply the attribute to every mapped desktop and mobile navigation link:

```tsx
<Link
  aria-current={currentPage(item.href) ? "page" : undefined}
  href={item.href}
  key={item.label}
  onClick={closeMenu}
>
  {item.label}
</Link>
```

Desktop links omit `onClick`; mobile links keep it. Add header active and pressed styling:

```css
.desktop-nav a[aria-current="page"],
.mobile-nav a[aria-current="page"] {
  color: var(--color-navy);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 6px;
}

.header-appointment:active,
.mobile-appointment:active,
.mobile-menu:active {
  transform: translateY(1px);
}
```

- [ ] **Step 4: Run the header test and verify GREEN**

Run: `cd frontend && npm test -- --run src/components/marketing/storefront-header.test.tsx`

Expected: PASS, 6 tests.

- [ ] **Step 5: Commit the header upgrade**

```bash
git add frontend/src/components/marketing/storefront-header.test.tsx frontend/src/components/marketing/storefront-header.tsx frontend/src/app/globals.css
git commit -m "feat: improve storefront navigation states"
```

---

### Task 3: Add honest field-level appointment validation

**Files:**
- Modify: `frontend/src/components/marketing/appointment-form.test.tsx`
- Modify: `frontend/src/components/marketing/appointment-form.tsx`
- Modify: `frontend/src/app/globals.css`

**Interfaces:**
- Produces: local `AppointmentErrors` state, Vietnamese phone validation, accessible field errors, local-only success, and `tel:0908123456` fallback.
- Preserves: field names `name`, `phone`, and `need`; field order and option values.

- [ ] **Step 1: Replace the appointment test with failing validation and success cases**

Replace `appointment-form.test.tsx` with:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppointmentForm } from "./appointment-form";

test("shows field-level errors for incomplete appointment details", async () => {
  const user = userEvent.setup();
  render(<AppointmentForm />);

  await user.click(screen.getByRole("button", { name: "Gửi yêu cầu đặt lịch" }));

  expect(screen.getByText("Nhập họ và tên của bạn.")).toBeInTheDocument();
  expect(screen.getByText("Nhập số điện thoại Việt Nam hợp lệ.")).toBeInTheDocument();
  expect(screen.getByLabelText("Họ và tên")).toHaveAttribute("aria-invalid", "true");
  expect(screen.getByLabelText("Số điện thoại")).toHaveAttribute("aria-invalid", "true");
});

test("keeps entered values when validation fails", async () => {
  const user = userEvent.setup();
  render(<AppointmentForm />);

  await user.type(screen.getByLabelText("Họ và tên"), "Nguyễn Anh");
  await user.type(screen.getByLabelText("Số điện thoại"), "123");
  await user.click(screen.getByRole("button", { name: "Gửi yêu cầu đặt lịch" }));

  expect(screen.getByLabelText("Họ và tên")).toHaveValue("Nguyễn Anh");
  expect(screen.getByLabelText("Số điện thoại")).toHaveValue("123");
});

test("confirms only local validation and provides a phone fallback", async () => {
  const user = userEvent.setup();
  render(<AppointmentForm />);

  await user.type(screen.getByLabelText("Họ và tên"), "Nguyễn Anh");
  await user.type(screen.getByLabelText("Số điện thoại"), "0900 000 000");
  await user.click(screen.getByRole("button", { name: "Gửi yêu cầu đặt lịch" }));

  expect(screen.getByRole("status")).toHaveTextContent(
    "Thông tin đã được kiểm tra trên thiết bị này. Gọi Anh Thi để xác nhận lịch hẹn.",
  );
  expect(screen.getByRole("link", { name: "Gọi 0908 123 456" })).toHaveAttribute(
    "href",
    "tel:0908123456",
  );
});
```

- [ ] **Step 2: Run the appointment tests and verify RED**

Run: `cd frontend && npm test -- --run src/components/marketing/appointment-form.test.tsx`

Expected: FAIL because the form has no custom errors and its success message implies delivery.

- [ ] **Step 3: Implement validation and accessible states**

Define the validation contract in `appointment-form.tsx`:

```tsx
type AppointmentErrors = {
  name?: string;
  phone?: string;
};

const vietnamesePhone = /^(?:\+84|0)(?:3|5|7|8|9)\d{8}$/;

function validateAppointment(form: FormData): AppointmentErrors {
  const name = String(form.get("name") ?? "").trim();
  const phone = String(form.get("phone") ?? "").replace(/[\s.-]/g, "");
  const errors: AppointmentErrors = {};

  if (!name) errors.name = "Nhập họ và tên của bạn.";
  if (!vietnamesePhone.test(phone)) {
    errors.phone = "Nhập số điện thoại Việt Nam hợp lệ.";
  }

  return errors;
}
```

Use state and submission logic:

```tsx
const [errors, setErrors] = useState<AppointmentErrors>({});
const [submitted, setSubmitted] = useState(false);

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const nextErrors = validateAppointment(new FormData(event.currentTarget));
  setErrors(nextErrors);

  if (Object.keys(nextErrors).length > 0) {
    setSubmitted(false);
    return;
  }

  event.currentTarget.reset();
  setSubmitted(true);
}
```

Set `noValidate` on the form. Add `aria-describedby`, `aria-invalid`, and error paragraphs to the name and phone fields:

```tsx
<input
  aria-describedby={errors.name ? "appointment-name-error" : undefined}
  aria-invalid={errors.name ? "true" : undefined}
  name="name"
  placeholder="Nguyễn Anh"
  required
  type="text"
/>
{errors.name ? (
  <span className="field-error" id="appointment-name-error">
    {errors.name}
  </span>
) : null}
```

Use the same structure with `appointment-phone-error` for the phone input. Replace the note/status area with:

```tsx
{submitted ? (
  <p className="appointment-status" role="status">
    Thông tin đã được kiểm tra trên thiết bị này. Gọi Anh Thi để xác nhận lịch hẹn.
  </p>
) : (
  <p className="appointment-note">
    Chúng tôi chưa gửi dữ liệu lên máy chủ. Vui lòng gọi cửa hàng để xác nhận.
  </p>
)}
<a className="appointment-phone" href="tel:0908123456">
  Gọi 0908 123 456
</a>
```

Add styles:

```css
.field-error {
  color: #ffd4cf;
  font-size: 12px;
  line-height: 1.4;
}

.appointment-form input[aria-invalid="true"] {
  border-color: #ffd4cf;
}

.appointment-phone {
  color: var(--color-on-navy);
  font-size: 13px;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 5px;
}
```

- [ ] **Step 4: Run the appointment tests and verify GREEN**

Run: `cd frontend && npm test -- --run src/components/marketing/appointment-form.test.tsx`

Expected: PASS, 3 tests.

- [ ] **Step 5: Commit the appointment upgrade**

```bash
git add frontend/src/components/marketing/appointment-form.test.tsx frontend/src/components/marketing/appointment-form.tsx frontend/src/app/globals.css
git commit -m "feat: add accessible appointment validation"
```

---

### Task 4: Clarify product actions and remove visible AI-style punctuation

**Files:**
- Modify: `frontend/src/app/page.test.tsx`
- Modify: `frontend/src/app/page.tsx`
- Modify: `frontend/src/components/marketing/editorial-hero.tsx`
- Modify: `frontend/src/components/marketing/hero-carousel.tsx`
- Modify: `frontend/src/components/marketing/storefront-data.ts`
- Modify: `frontend/src/components/marketing/storefront-footer.tsx`
- Modify: `frontend/src/components/marketing/store-locations-page.tsx`
- Modify: `frontend/src/app/bac-si/page.tsx`
- Modify: `frontend/src/app/bac-si/page.test.tsx`
- Modify: `frontend/src/app/globals.css`

**Interfaces:**
- Produces: visible `Tư vấn tại cửa hàng` links to `/#locations`, one review rating treatment, structured review attribution, and visible copy with ASCII hyphens only.
- Preserves: product data, destinations, review content, opening hours, and doctor credentials.

- [ ] **Step 1: Add failing home-page content tests**

Append to `src/app/page.test.tsx`:

```tsx
test("makes every product consultation destination visible", async () => {
  render(await Home({ searchParams: Promise.resolve({}) }));

  const consultationLinks = screen.getAllByRole("link", {
    name: "Tư vấn tại cửa hàng",
  });
  expect(consultationLinks).toHaveLength(4);
  consultationLinks.forEach((link) => {
    expect(link).toHaveAttribute("href", "/#locations");
  });
});

test("uses one review rating treatment and no long dash characters", async () => {
  const { container } = render(await Home({ searchParams: Promise.resolve({}) }));

  expect(screen.getAllByLabelText("5 trên 5 sao")).toHaveLength(1);
  expect(container.textContent).not.toMatch(/[—–]/);
});
```

Update the two expected doctor-page strings in `src/app/bac-si/page.test.tsx` to use a colon and ASCII date hyphen:

```ts
title: "Nhận bằng Bác sĩ chuyên khoa 2: Đại học Y Dược TP.HCM",
title: "Tốt nghiệp Bác sĩ đa khoa YK15: Đại học Y Dược Cần Thơ",
copy: "Niên khóa 1989 - 1995, lớp YK15. Nền tảng y khoa tổng quát, xây dựng tư duy lâm sàng toàn diện.",
```

- [ ] **Step 2: Run focused tests and verify RED**

Run: `cd frontend && npm test -- --run src/app/page.test.tsx src/app/bac-si/page.test.tsx`

Expected: FAIL because product actions are image-only, every review repeats stars, and visible copy contains long dash characters.

- [ ] **Step 3: Add visible product actions and simplify reviews**

In each product card in `page.tsx`, add after the price:

```tsx
<Link className="product-consultation" href="/#locations">
  Tư vấn tại cửa hàng
  <ArrowRight aria-hidden="true" size={16} strokeWidth={1.5} />
</Link>
```

Use this review footer shape for the featured review:

```tsx
<div className="review-card__footer">
  <span className="review-stars" aria-label="5 trên 5 sao">
    ★★★★★
  </span>
  <p className="review-meta">
    <strong>{reviews[0].name}</strong>
    <span>{reviews[0].city}</span>
  </p>
</div>
```

Use this footer for supporting reviews:

```tsx
<div className="review-card__footer">
  <p className="review-meta">
    <strong>{review.name}</strong>
    <span>{review.city}</span>
  </p>
</div>
```

Add styles:

```css
.product-consultation {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 44px;
  gap: 8px;
  color: var(--color-navy);
  font-size: 13px;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 5px;
}

.review-meta {
  display: grid;
  gap: 2px;
}

.review-meta strong {
  color: var(--color-text);
  font-weight: 600;
}
```

- [ ] **Step 4: Replace long dash characters in scoped visible strings**

Use commas in hero alt text:

```ts
alt: "Người mẫu đeo kính Anh Thi, phong cách tối giản"
alt: "Người mẫu đeo kính Anh Thi, bộ sưu tập hiện đại"
alt: "Người mẫu đeo kính Anh Thi, thiết kế cao cấp"
```

Use `09:00 - 20:30` in `storefront-data.ts`, `storefront-footer.tsx`, and `store-locations-page.tsx`. Use colons in the two doctor credential titles and `1989-1995` for the date field. Use `1989 - 1995` inside prose. Apply the same comma alt-text treatment in `hero-carousel.tsx`.

- [ ] **Step 5: Run focused tests and verify GREEN**

Run: `cd frontend && npm test -- --run src/app/page.test.tsx src/app/bac-si/page.test.tsx src/components/marketing/editorial-hero.test.tsx src/components/marketing/hero-carousel.test.tsx`

Expected: PASS for all selected files.

- [ ] **Step 6: Commit the content and journey upgrade**

```bash
git add frontend/src/app/page.test.tsx frontend/src/app/page.tsx frontend/src/components/marketing/editorial-hero.tsx frontend/src/components/marketing/hero-carousel.tsx frontend/src/components/marketing/storefront-data.ts frontend/src/components/marketing/storefront-footer.tsx frontend/src/components/marketing/store-locations-page.tsx frontend/src/app/bac-si/page.tsx frontend/src/app/bac-si/page.test.tsx frontend/src/app/globals.css
git commit -m "feat: clarify storefront customer journeys"
```

---

### Task 5: Apply responsive visual polish and complete interaction states

**Files:**
- Create: `frontend/src/app/globals-css.test.ts`
- Modify: `frontend/src/app/page.tsx`
- Modify: `frontend/src/app/globals.css`

**Interfaces:**
- Consumes: existing class names plus `#main-content`.
- Produces: `100dvh` hero, 2-by-2 mobile trust grid, two-column product grid from 390 pixels, one-column product grid below 390 pixels, reduced border repetition, and pressed states.

- [ ] **Step 1: Write a failing CSS contract test**

Create `src/app/globals-css.test.ts`:

```ts
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("./globals.css", import.meta.url), "utf8");

test("uses a stable viewport and immediate mobile trust proof", () => {
  expect(css).toMatch(/\.editorial-hero\s*\{[^}]*min-height:\s*100dvh/s);
  expect(css).toMatch(
    /@media \(max-width: 860px\)[\s\S]*?\.trust-strip__track\s*\{[^}]*grid-template-columns:\s*repeat\(2,/,
  );
  expect(css).not.toMatch(/\.trust-strip__track\s*\{[^}]*overflow-x:\s*auto/s);
});

test("keeps product discovery dense until narrow mobile widths", () => {
  expect(css).toMatch(
    /@media \(max-width: 389px\)[\s\S]*?\.product-grid\s*\{[^}]*grid-template-columns:\s*1fr/,
  );
});

test("defines tactile and active interaction states", () => {
  expect(css).toContain('.desktop-nav a[aria-current="page"]');
  expect(css).toMatch(/\.primary-button:active[\s\S]*?transform:\s*translateY\(1px\)/);
});
```

- [ ] **Step 2: Run the CSS contract test and verify RED**

Run: `cd frontend && npm test -- --run src/app/globals-css.test.ts`

Expected: FAIL because the hero uses `100svh`, trust proof scrolls horizontally, and products collapse at 600 pixels.

- [ ] **Step 3: Add the main target and stable viewport rules**

Change the home main element to:

```tsx
<main id="main-content">
```

Use these hero rules:

```css
.site-shell {
  min-height: 100dvh;
}

.editorial-hero,
.editorial-hero__media {
  min-height: 100dvh;
}
```

Inside `@media (max-width: 860px)`, use:

```css
.editorial-hero {
  grid-template-columns: 1fr;
  grid-template-rows: minmax(348px, 52dvh) minmax(300px, 48dvh);
  min-height: 100dvh;
}

.editorial-hero__copy {
  min-height: 0;
  padding: 92px var(--page-gutter) 20px;
}

.editorial-hero__copy h1 {
  font-size: clamp(46px, 13vw, 64px);
}

.editorial-hero__copy > p {
  margin-top: 16px;
  font-size: 16px;
}

.editorial-hero__actions {
  margin-top: 20px;
}

.editorial-hero__media {
  min-height: 0;
}
```

- [ ] **Step 4: Replace mobile trust scrolling and product collapse rules**

Inside `@media (max-width: 860px)`, replace the trust strip block with:

```css
.trust-strip__track {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  overflow: visible;
}

.trust-signal {
  min-height: 96px;
  padding: 18px 12px;
}

.trust-signal:nth-child(odd) {
  border-left: 0;
}

.trust-signal:nth-child(n + 3) {
  border-top: 1px solid var(--color-border);
}
```

Delete the `.product-grid { grid-template-columns: 1fr; }` declaration from `@media (max-width: 600px)`. Add:

```css
@media (max-width: 389px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 5: Reduce repeated card treatment and add tactile feedback**

Apply these exact surface changes:

```css
.collection-card {
  border: 0;
}

.review-card {
  border: 0;
  border-top: 1px solid var(--color-border);
  background: transparent;
}

.review-card--featured {
  color: var(--color-on-navy);
  background: var(--color-navy);
}

.review-card--featured .review-quote-mark,
.review-card--featured .review-stars,
.review-card--featured .review-meta,
.review-card--featured .review-meta strong {
  color: inherit;
}

.store-card {
  border-right: 0;
  border-left: 0;
  background: transparent;
}

.primary-button:active,
.outline-button:active,
.collection-card:active,
.product-consultation:active,
.store-actions a:active {
  transform: translateY(1px);
}
```

Use `text-wrap: balance` for `h1, h2` and `text-wrap: pretty` for body paragraphs. Keep transition properties explicit rather than `transition: all`.

- [ ] **Step 6: Run the CSS contract and focused page tests**

Run: `cd frontend && npm test -- --run src/app/globals-css.test.ts src/app/page.test.tsx`

Expected: PASS for both files.

- [ ] **Step 7: Commit responsive visual polish**

```bash
git add frontend/src/app/globals-css.test.ts frontend/src/app/page.tsx frontend/src/app/globals.css
git commit -m "feat: polish Lensora responsive storefront"
```

---

### Task 6: Run full verification and responsive QA

**Files:**
- Modify only if verification exposes a scoped regression in files already named above.

**Interfaces:**
- Produces: verified tests, type safety, production build, responsive layouts, keyboard behavior, and reduced-motion behavior.

- [ ] **Step 1: Scan visible source copy for forbidden dash characters**

Run:

```bash
rg -n "—|–" frontend/src --glob '*.{tsx,ts}'
```

Expected: no matches in visible production strings. Test fixtures may use neither character after Task 4.

- [ ] **Step 2: Run the complete automated suite**

Run:

```bash
cd frontend
npm test -- --run
npm run typecheck
npm run build
```

Expected: 13 test files pass, type-check exits 0, and Next.js production build exits 0.

- [ ] **Step 3: Run desktop and mobile browser QA**

Start the application with `cd frontend && npm run dev`. Validate at:

- 1440 by 900
- 1024 by 768
- 768 by 1024
- 414 by 896
- 390 by 844
- 375 by 667

At every viewport verify:

- No page-level horizontal overflow.
- Header is one line on desktop and the mobile menu opens, locks scrolling, closes on Escape, and restores scrolling.
- Hero copy, both CTAs, controls, and eyewear crop are visible and readable.
- Trust proof is one row on desktop and two by two on mobile.
- Product grid is four, two, or one column according to the approved breakpoints.
- Product consultation links, filters, empty state, doctor link, store actions, map link, and telephone links work.
- Appointment errors are associated with fields, invalid values remain, valid local success is honest, and phone fallback remains visible.
- Keyboard focus is visible and reduced-motion mode disables autoplay and nonessential movement.

- [ ] **Step 4: Run the taste pre-flight audit**

Confirm mechanically:

- One accent color and one page theme.
- Square radius system and no shadow or gradient additions.
- No em-dash or en-dash characters.
- No CTA wraps at desktop.
- Header height is at most 76 pixels and navigation remains one line.
- Hero uses `100dvh`, stays near one mobile viewport, and keeps text away from eyewear.
- Four proof points are visible on mobile.
- No duplicate CTA intent, scroll cues, decorative dots, fake version labels, or fake product screenshots.
- Every control has hover, active, focus-visible, and reduced-motion-safe behavior.

- [ ] **Step 5: Commit any verification-only fixes**

If verification required a correction, stage only the exact corrected files and commit:

```bash
git add frontend/src/app frontend/src/components/marketing frontend/src/test/setup.ts
git commit -m "fix: resolve Lensora storefront QA findings"
```

If no files changed, do not create an empty commit.
