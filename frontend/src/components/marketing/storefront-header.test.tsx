import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StorefrontHeader } from "./storefront-header";

test("opens and closes the mobile navigation", async () => {
  const user = userEvent.setup();

  render(
    <StorefrontHeader
      navItems={[{ label: "Đo mắt", href: "#eye-exam" }]}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Mở menu" }));

  expect(
    screen.getByRole("navigation", { name: "Điều hướng trên di động" }),
  ).toBeVisible();

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
