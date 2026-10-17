import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "./theme-toggle";

test("switches both the page theme and its accessible action label on each click", async () => {
  const user = userEvent.setup();
  render(<ThemeToggle />);
  await user.click(
    screen.getByRole("button", { name: "Chuyển sang giao diện tối" }),
  );
  expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  await user.click(
    screen.getByRole("button", { name: "Chuyển sang giao diện sáng" }),
  );
  expect(document.documentElement).toHaveAttribute("data-theme", "light");
});
