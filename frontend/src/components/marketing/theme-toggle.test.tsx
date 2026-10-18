import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, vi } from "vitest";
import { ThemeToggle } from "./theme-toggle";

beforeEach(() => {
  vi.stubGlobal("localStorage", { getItem: vi.fn(() => null), setItem: vi.fn() });
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })));
});

afterEach(() => {
  vi.unstubAllGlobals();
  delete document.documentElement.dataset.theme;
});

test("defaults to light even when the device prefers dark mode", () => {
  render(<ThemeToggle />);
  expect(document.documentElement).toHaveAttribute("data-theme", "light");
  expect(screen.getByRole("button", { name: "Chuyển sang giao diện tối" })).toBeVisible();
});

test("remembers an explicitly chosen dark theme", () => {
  vi.mocked(window.localStorage.getItem).mockReturnValue("dark");
  render(<ThemeToggle />);
  expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  expect(screen.getByRole("button", { name: "Chuyển sang giao diện sáng" })).toBeVisible();
});

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
