import { render, waitFor } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import { RouteScroll } from "./route-scroll";

const route = vi.hoisted(() => ({ pathname: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.pathname }));
afterEach(() => {
  route.pathname = "/";
  window.history.replaceState({}, "", "/");
  vi.restoreAllMocks();
});

test("reaches a deep-linked home section when streaming adds it after mount", async () => {
  window.history.replaceState({}, "", "/#bestsellers");
  render(<RouteScroll />);
  const section = document.createElement("section");
  section.id = "bestsellers";
  const scroll = vi.fn();
  section.scrollIntoView = scroll;
  document.body.append(section);
  await waitFor(() =>
    expect(scroll).toHaveBeenCalledWith({
      block: "start",
      behavior: "instant",
    }),
  );
  section.remove();
});

test("starts a new product route at the top instead of retaining a deep catalogue position", () => {
  const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  const { rerender } = render(<RouteScroll />);
  route.pathname = "/san-pham/parim-85006";
  rerender(<RouteScroll />);
  expect(scroll).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "instant" });
});

test("leaves browser history restoration to the browser", () => {
  const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  const { rerender } = render(<RouteScroll />);
  window.dispatchEvent(new PopStateEvent("popstate"));
  route.pathname = "/gong-kinh";
  rerender(<RouteScroll />);
  expect(scroll).not.toHaveBeenCalled();
});
