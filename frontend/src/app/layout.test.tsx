import { render, screen } from "@testing-library/react";
import RootLayout from "./layout";

test("declares document behavior, brand fonts, and skip navigation", () => {
  const layout = RootLayout({ children: <main id="main-content" /> });

  expect(layout.props["data-scroll-behavior"]).toBe("smooth");
  expect(layout.props.className).toContain("font-ui-variable");
  expect(layout.props.className).toContain("font-editorial-variable");

  render(layout.props.children);
  expect(
    screen.getByRole("link", { name: "Bỏ qua đến nội dung chính" }),
  ).toHaveAttribute("href", "#main-content");
});
