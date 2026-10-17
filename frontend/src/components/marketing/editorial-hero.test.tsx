import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import { EditorialHero } from "./editorial-hero";

let preferenceChanged: (() => void) | undefined;
let reduceMotion = false;

beforeEach(() => {
  reduceMotion = false;
  preferenceChanged = undefined;
  vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  vi.stubGlobal("matchMedia", () => ({
    get matches() { return reduceMotion; },
    addEventListener: vi.fn((_event: string, callback: () => void) => {
      preferenceChanged = callback;
    }),
    removeEventListener: vi.fn(),
  }));
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

test("plays the supplied advertisement muted with native playback controls", () => {
  render(<EditorialHero />);
  const video = screen.getByLabelText(
    "Video giới thiệu Kính thuốc Anh Thi",
  ) as HTMLVideoElement;

  expect(video).toHaveAttribute(
    "src", "/videos/gioi_thieu_kinh_thuoc_anh_thi_ngang_1920x1080.mp4",
  );
  expect(video).toHaveAttribute("controls");
  expect(video).toHaveAttribute("playsinline");
  expect(video).toHaveAttribute("autoplay");
  expect(video.muted).toBe(true);
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
  expect(screen.getByRole("heading", {
    level: 1,
    name: "Chọn kính phù hợp. An tâm cho đôi mắt.",
  })).toBeVisible();
  expect(screen.queryByRole("button", { name: "Ảnh tiếp theo" })).toBeNull();
});

test("respects reduced motion and updates when the preference changes", () => {
  reduceMotion = true;
  render(<EditorialHero />);
  const video = screen.getByLabelText("Video giới thiệu Kính thuốc Anh Thi");

  expect(video).not.toHaveAttribute("autoplay");
  expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
  expect(video).toHaveAttribute("controls");

  act(() => {
    reduceMotion = false;
    preferenceChanged?.();
  });
  expect(video).toHaveAttribute("autoplay");
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();

  Object.defineProperty(video, "paused", { value: false });
  act(() => {
    reduceMotion = true;
    preferenceChanged?.();
  });
  expect(video).not.toHaveAttribute("autoplay");
  expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
});

test("keeps native controls available when autoplay is blocked", async () => {
  vi.mocked(HTMLMediaElement.prototype.play).mockRejectedValue(
    new DOMException("Autoplay blocked", "NotAllowedError"),
  );
  render(<EditorialHero />);
  await act(async () => {});

  expect(screen.getByLabelText("Video giới thiệu Kính thuốc Anh Thi"))
    .toHaveAttribute("controls");
  expect(screen.queryByRole("alert")).toBeNull();
});

test("offers recovery and retains the store actions if video loading fails", () => {
  render(<EditorialHero />);
  fireEvent.error(screen.getByLabelText("Video giới thiệu Kính thuốc Anh Thi"));

  expect(screen.getByRole("alert")).toHaveTextContent("Video chưa tải được");
  expect(screen.getByRole("link", { name: "Mở video trực tiếp" })).toHaveAttribute(
    "href", "/videos/gioi_thieu_kinh_thuoc_anh_thi_ngang_1920x1080.mp4",
  );
  expect(screen.getByRole("link", { name: "Đặt lịch đo mắt" })).toHaveAttribute(
    "href", "/#eye-exam",
  );
  expect(screen.getByRole("link", { name: "Xem mẫu kính" })).toHaveAttribute(
    "href", "/#bestsellers",
  );
});
