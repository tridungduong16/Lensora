import { afterEach, beforeEach, vi } from "vitest";
import { toBlob } from "html-to-image";
import { exportPricePng } from "./export-price-png";

vi.mock("html-to-image", () => ({ toBlob: vi.fn() }));

beforeEach(() => {
  vi.useFakeTimers();
  Object.defineProperty(document, "fonts", { configurable: true, value: { ready: Promise.resolve() } });
  vi.spyOn(HTMLElement.prototype, "scrollHeight", "get").mockReturnValue(3000);
  vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
  vi.stubGlobal("URL", { createObjectURL: vi.fn(() => "blob:price-png"), revokeObjectURL: vi.fn() });
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.mocked(toBlob).mockReset();
  document.body.replaceChildren();
});

function makeTable() {
  const source = document.createElement("div");
  source.id = "price-sheet";
  source.innerHTML = '<nav data-png-exclude>Điều hướng</nav><h1 id="title">Kính thuốc Anh Thi</h1><table><tbody><tr><td>590.000đ</td></tr></tbody></table><aside>Lưu ý</aside>';
  document.body.append(source);
  return source;
}

test("downloads a full PNG with its filename while leaving the displayed table unchanged", async () => {
  const source = makeTable();
  const original = source.outerHTML;
  vi.mocked(toBlob).mockImplementation(async (copy, options) => {
    expect(copy).not.toBe(source);
    expect(copy).toHaveTextContent("Kính thuốc Anh Thi590.000đLưu ý");
    expect(copy.querySelector("nav")).toBeNull();
    expect(document.querySelectorAll("#price-sheet")).toHaveLength(1);
    expect(document.querySelectorAll("#title")).toHaveLength(1);
    expect(options).toMatchObject({ width: 1200, height: 3000, pixelRatio: 2 });
    return new Blob(["PNG"], { type: "image/png" });
  });
  const click = vi.mocked(HTMLAnchorElement.prototype.click);

  await exportPricePng(source, "bang-gia-hai-trong-anh-thi");

  expect(click).toHaveBeenCalledTimes(1);
  expect(click.mock.instances[0]).toHaveAttribute("download", "bang-gia-hai-trong-anh-thi.png");
  expect(source.outerHTML).toBe(original);
  expect(document.body.children).toHaveLength(1);
  expect(URL.revokeObjectURL).not.toHaveBeenCalled();
  vi.advanceTimersByTime(30_000);
  expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:price-png");
});

test.each(["failure", "empty blob"])("removes the capture copy after %s without downloading", async (result) => {
  const source = makeTable();
  if (result === "failure") vi.mocked(toBlob).mockRejectedValueOnce(new Error("Canvas failed"));
  else vi.mocked(toBlob).mockResolvedValueOnce(null);

  await expect(exportPricePng(source, "bang-gia")).rejects.toThrow();

  expect(document.body.children).toHaveLength(1);
  expect(source).toBeInTheDocument();
  expect(HTMLAnchorElement.prototype.click).not.toHaveBeenCalled();
});

test("reduces image scale for a long table to fit mobile canvas limits", async () => {
  const source = makeTable();
  vi.spyOn(HTMLElement.prototype, "scrollHeight", "get").mockReturnValue(10_000);
  vi.mocked(toBlob).mockResolvedValueOnce(new Blob(["PNG"], { type: "image/png" }));

  await exportPricePng(source, "bang-gia");

  const options = vi.mocked(toBlob).mock.calls[0][1]!;
  expect(10_000 * options.pixelRatio!).toBeLessThanOrEqual(8192);
  expect(1200 * 10_000 * options.pixelRatio! ** 2).toBeLessThanOrEqual(16_000_000);
});
