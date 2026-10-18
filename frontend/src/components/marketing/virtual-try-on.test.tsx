import { StrictMode } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, vi } from "vitest";
import { VirtualTryOn } from "./virtual-try-on";

vi.mock("./try-on-studio", () => ({ default: () => <p>Camera chỉ bật sau khi bạn chọn bật camera.</p> }));

const originalShowModal = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, "showModal");
beforeEach(() => {
  Object.defineProperty(HTMLDialogElement.prototype, "showModal", { configurable: true, value: function (this: HTMLDialogElement) {
    this.setAttribute("open", "");
  } });
});
afterEach(() => {
  if (originalShowModal) Object.defineProperty(HTMLDialogElement.prototype, "showModal", originalShowModal);
  else Reflect.deleteProperty(HTMLDialogElement.prototype, "showModal");
  vi.restoreAllMocks();
});

test("keeps the dialog open under Strict Mode and restores focus and scrolling on close", async () => {
  const user = userEvent.setup();
  render(<StrictMode><VirtualTryOn slug="bolon-gong-vuong" /></StrictMode>);
  const trigger = screen.getByRole("button", { name: "Thử kính bằng camera" });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  await user.click(trigger);
  expect(await screen.findByRole("dialog", { name: "Thử kính trên gương mặt bạn" })).toBeVisible();
  expect(await screen.findByText(/Camera chỉ bật/)).toBeVisible();
  expect(document.body.style.overflow).toBe("hidden");
  await user.click(screen.getByRole("button", { name: "Đóng thử kính" }));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(document.body.style.overflow).toBe("");
  await waitFor(() => expect(trigger).toHaveFocus());
});

test("closes when the browser sends the native Escape cancellation", async () => {
  const user = userEvent.setup();
  render(<VirtualTryOn slug="bolon-gong-vuong" />);
  await user.click(screen.getByRole("button", { name: "Thử kính bằng camera" }));
  fireEvent(screen.getByRole("dialog"), new Event("cancel", { bubbles: true }));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("does not invent a try-on asset for an uncalibrated product", () => {
  render(<VirtualTryOn slug="uncalibrated-model" />);
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
});
