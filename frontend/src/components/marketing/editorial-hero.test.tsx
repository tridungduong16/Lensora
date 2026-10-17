import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, vi } from "vitest";
import { EditorialHero } from "./editorial-hero";

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

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

  await user.click(screen.getByRole("button", { name: "Tạm dừng chuyển ảnh" }));
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

  fireEvent.error(screen.getByRole("img", { name: /phong cách tối giản/i }));

  expect(
    screen
      .getByRole("img", { name: /bộ sưu tập hiện đại/i })
      .closest("[aria-hidden]"),
  ).toHaveAttribute("aria-hidden", "false");
});

test("starts automatic changes after the first photograph loads", () => {
  vi.useFakeTimers();
  vi.stubGlobal("matchMedia", () => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  render(<EditorialHero />);
  act(() => vi.advanceTimersByTime(5500));
  expect(
    screen.getByRole("img", { name: /phong cách tối giản/i }),
  ).toBeInTheDocument();
  fireEvent.load(screen.getByRole("img", { name: /phong cách tối giản/i }));
  act(() => vi.advanceTimersByTime(5500));
  expect(
    screen.getByRole("img", { name: /bộ sưu tập hiện đại/i }),
  ).toBeInTheDocument();
});

test("respects reduced motion while retaining manual image controls", () => {
  vi.useFakeTimers();
  vi.stubGlobal("matchMedia", () => ({
    matches: true,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  render(<EditorialHero />);
  fireEvent.load(screen.getByRole("img", { name: /phong cách tối giản/i }));
  act(() => vi.advanceTimersByTime(11000));
  expect(
    screen.getByRole("img", { name: /phong cách tối giản/i }),
  ).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Ảnh tiếp theo" }));
  expect(
    screen.getByRole("img", { name: /bộ sưu tập hiện đại/i }),
  ).toBeInTheDocument();
});
