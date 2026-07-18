import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StorefrontHeader } from "./storefront-header";
import { storefrontNavigation } from "./storefront-navigation";

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

test("adds the scrolled surface to the overlay header", () => {
  Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
  render(<StorefrontHeader navItems={storefrontNavigation} overlay />);

  const header = screen.getByRole("banner");
  expect(header).toHaveClass("site-header--overlay");
  expect(header).not.toHaveClass("is-scrolled");

  Object.defineProperty(window, "scrollY", { configurable: true, value: 80 });
  fireEvent.scroll(window);

  expect(header).toHaveClass("is-scrolled");
});
