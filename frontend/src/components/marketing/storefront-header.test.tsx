import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, vi } from "vitest";
import { StorefrontHeader } from "./storefront-header";
import { storefrontNavigation } from "./storefront-navigation";

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

test("opens and closes the mobile navigation", async () => {
  const user = userEvent.setup();

  render(<StorefrontHeader navItems={storefrontNavigation} />);

  await user.click(screen.getByRole("button", { name: "Mở menu" }));

  const mobileNavigation = screen.getByRole("navigation", {
    name: "Điều hướng trên di động",
  });
  expect(mobileNavigation).toBeVisible();
  expect(within(mobileNavigation).getByRole("link", { name: "Bác sĩ" })).toHaveAttribute(
    "href",
    "/bac-si",
  );

  await user.click(screen.getByRole("button", { name: "Đóng menu" }));

  expect(
    screen.queryByRole("navigation", { name: "Điều hướng trên di động" }),
  ).not.toBeInTheDocument();
});

test("balances six desktop navigation links around the logo", () => {
  const navItems = Array.from({ length: 6 }, (_, index) => ({
    label: `Mục ${index + 1}`,
    href: `/muc-${index + 1}`,
  }));

  render(<StorefrontHeader navItems={navItems} />);

  expect(
    screen.getByRole("navigation", { name: "Điều hướng chính bên trái" }),
  ).toHaveTextContent("Mục 1Mục 2Mục 3");
  expect(
    screen.getByRole("navigation", { name: "Điều hướng chính bên phải" }),
  ).toHaveTextContent("Mục 4Mục 5Mục 6");
});

test("offers the appointment CTA on desktop and mobile", async () => {
  const user = userEvent.setup();
  render(<StorefrontHeader navItems={storefrontNavigation} />);

  expect(screen.getByRole("link", { name: "Đặt lịch đo mắt" })).toHaveAttribute(
    "href",
    "/#eye-exam",
  );

  await user.click(screen.getByRole("button", { name: "Mở menu" }));

  expect(
    within(
      screen.getByRole("navigation", { name: "Điều hướng trên di động" }),
    ).getByRole("link", { name: "Đặt lịch đo mắt" }),
  ).toHaveAttribute("href", "/#eye-exam");
});

test("changes the overlay surface when the hero leaves the viewport", () => {
  vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
  const hero = document.createElement("section");
  hero.className = "editorial-hero";
  document.body.append(hero);

  render(<StorefrontHeader navItems={storefrontNavigation} overlay />);

  const header = screen.getByRole("banner");
  expect(header).toHaveClass("site-header--overlay");

  act(() => {
    intersectionCallback(
      [{ isIntersecting: false } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
  });

  expect(header).toHaveClass("is-scrolled");
  hero.remove();
});

test("marks the current route in desktop and mobile navigation", async () => {
  navigationState.pathname = "/bac-si";
  const user = userEvent.setup();
  render(<StorefrontHeader navItems={storefrontNavigation} />);

  expect(
    within(
      screen.getByRole("navigation", {
        name: "Điều hướng chính bên phải",
      }),
    ).getByRole("link", { name: "Bác sĩ" }),
  ).toHaveAttribute("aria-current", "page");

  await user.click(screen.getByRole("button", { name: "Mở menu" }));
  expect(
    within(
      screen.getByRole("navigation", {
        name: "Điều hướng trên di động",
      }),
    ).getByRole("link", { name: "Bác sĩ" }),
  ).toHaveAttribute("aria-current", "page");
});

test("locks page scrolling and closes the mobile menu with Escape", async () => {
  const user = userEvent.setup();
  render(<StorefrontHeader navItems={storefrontNavigation} />);

  await user.click(screen.getByRole("button", { name: "Mở menu" }));
  expect(document.body.style.overflow).toBe("hidden");

  fireEvent.keyDown(document, { key: "Escape" });
  expect(
    screen.queryByRole("navigation", { name: "Điều hướng trên di động" }),
  ).not.toBeInTheDocument();
  expect(document.body.style.overflow).toBe("");
});

test("renders the supplied logo image instead of the header text wordmark", () => {
  render(<StorefrontHeader navItems={storefrontNavigation} />);

  const brandLink = screen.getByRole("link", {
    name: "Trang chủ Kính thuốc Anh Thi",
  });
  expect(brandLink.querySelector("img.brand-logo")).toBeInTheDocument();
  expect(brandLink).not.toHaveTextContent("ANH THI");
  expect(brandLink).not.toHaveTextContent("EYEGLASSES");
});
