import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, vi } from "vitest";
import { ExportPriceButton } from "./export-price-button";

const exportPricePng = vi.hoisted(() => vi.fn());
vi.mock("@/lib/export-price-png", () => ({ exportPricePng }));

afterEach(() => exportPricePng.mockReset());

test("prevents repeated exports while an image is being generated", async () => {
  let finishExport!: () => void;
  exportPricePng.mockReturnValue(new Promise<void>((resolve) => { finishExport = resolve; }));
  const user = userEvent.setup();
  render(
    <>
      <div id="price-sheet">Bảng giá</div>
      <ExportPriceButton targetId="price-sheet" filename="bang-gia-doi-mau-anh-thi" />
    </>,
  );

  await user.click(screen.getByRole("button", { name: "Xuất PNG" }));
  await waitFor(() => expect(exportPricePng).toHaveBeenCalledWith(
    document.getElementById("price-sheet"), "bang-gia-doi-mau-anh-thi",
  ));
  const button = screen.getByRole("button", { name: "Đang xuất…" });
  expect(button).toBeDisabled();
  expect(button).toHaveAttribute("aria-busy", "true");
  await user.click(button);
  expect(exportPricePng).toHaveBeenCalledTimes(1);

  await act(async () => finishExport());
  expect(screen.getByRole("button", { name: "Xuất PNG" })).toBeEnabled();
  expect(screen.getByRole("status")).toHaveTextContent("Đã tải ảnh PNG.");
});

test("shows an export error and allows retrying", async () => {
  exportPricePng.mockRejectedValueOnce(new Error("Canvas failed")).mockResolvedValueOnce(undefined);
  const user = userEvent.setup();
  render(
    <>
      <div id="price-sheet">Bảng giá</div>
      <ExportPriceButton targetId="price-sheet" filename="bang-gia-exfash-anh-thi" />
    </>,
  );

  await user.click(screen.getByRole("button", { name: "Xuất PNG" }));
  await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Chưa thể xuất ảnh."));
  await user.click(screen.getByRole("button", { name: "Xuất PNG" }));
  await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Đã tải ảnh PNG."));
  expect(exportPricePng).toHaveBeenCalledTimes(2);
});

test("handles a missing table without starting an export", async () => {
  const user = userEvent.setup();
  render(<ExportPriceButton targetId="missing-table" filename="bang-gia" />);

  await user.click(screen.getByRole("button", { name: "Xuất PNG" }));

  expect(screen.getByRole("status")).toHaveTextContent("Chưa thể xuất ảnh.");
  expect(screen.getByRole("button", { name: "Xuất PNG" })).toBeEnabled();
  expect(exportPricePng).not.toHaveBeenCalled();
});
