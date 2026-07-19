import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EditorialHero } from "./editorial-hero";

test("moves to the next model with the explicit control", async () => {
  const user = userEvent.setup();
  render(<EditorialHero />);

  await user.click(screen.getByRole("button", { name: "Ảnh tiếp theo" }));

  expect(
    screen
      .getByRole("img", { name: /bộ sưu tập hiện đại/i })
      .closest("[aria-hidden]"),
  ).toHaveAttribute("aria-hidden", "false");
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

test("shows the active hero image without extra zoom", () => {
  render(<EditorialHero />);

  expect(
    screen
      .getByRole("img", { name: /phong cách tối giản/i })
      .closest("[aria-hidden]"),
  ).not.toHaveStyle({ transform: "scale(1.02)" });
});

test("skips an image that fails to load", () => {
  render(<EditorialHero />);

  fireEvent.error(
    screen.getByRole("img", { name: /phong cách tối giản/i }),
  );

  expect(
    screen
      .getByRole("img", { name: /bộ sưu tập hiện đại/i })
      .closest("[aria-hidden]"),
  ).toHaveAttribute("aria-hidden", "false");
});
