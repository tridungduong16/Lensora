import { cameraErrorMessage, getGlassesPose, smoothPose, type FacePoint } from "./try-on-geometry";
import { tryOnFrames, tryOnProducts } from "./try-on-frames";
import { existsSync } from "node:fs";
import path from "node:path";

function face(): FacePoint[] {
  const points = Array.from({ length: 478 }, () => ({ x: 0.5, y: 0.5 }));
  points[33] = { x: 0.3, y: 0.4 };
  points[133] = { x: 0.4, y: 0.4 };
  points[362] = { x: 0.6, y: 0.4 };
  points[263] = { x: 0.7, y: 0.4 };
  points[168] = { x: 0.5, y: 0.42 };
  return points;
}

test("anchors glasses between the eyes in the camera's aspect ratio", () => {
  const pose = getGlassesPose(face(), 1000, 500)!;
  expect(pose.x).toBeCloseTo(500);
  expect(pose.y).toBe(200);
  expect(pose.width).toBeCloseTo(675);
  expect(pose.angle).toBe(0);
  const points = face();
  points[362].y = points[263].y = 0.5;
  expect(getGlassesPose(points, 1000, 500)?.angle).toBeCloseTo(Math.atan2(50, 300));
});

test("hides glasses when tracking is absent, invalid, too small or sideways", () => {
  expect(getGlassesPose([], 640, 480)).toBeNull();
  const points = face();
  points[33].x = NaN;
  expect(getGlassesPose(points, 640, 480)).toBeNull();
  points[33].x = -0.1;
  expect(getGlassesPose(points, 640, 480)).toBeNull();
  const turned = face();
  turned[168].x = 0.75;
  expect(getGlassesPose(turned, 640, 480)).toBeNull();
  expect(getGlassesPose(Array.from({ length: 478 }, () => ({ x: 0.5, y: 0.5 })), 640, 480)).toBeNull();
});

test("smooths jitter but reacquires a face that moves across the scene", () => {
  const start = { x: 100, y: 100, width: 200, angle: 0 };
  const next = { x: 120, y: 110, width: 220, angle: 0.1 };
  expect(smoothPose(start, next)).toMatchObject({ x: 111, y: 105.5, width: 211 });
  expect(smoothPose(null, next)).toEqual(next);
  const moved = { ...next, x: 600 };
  expect(smoothPose(start, moved)).toEqual(moved);
});

test("gives actionable recovery for permission denial and unavailable cameras", () => {
  expect(cameraErrorMessage(new DOMException("denied", "NotAllowedError"))).toMatch(/quyền camera/);
  expect(cameraErrorMessage(new DOMException("missing", "NotFoundError"))).toMatch(/Không tìm thấy camera/);
  expect(cameraErrorMessage(new DOMException("busy", "NotReadableError"))).toMatch(/Đóng ứng dụng khác/);
});

test("every supported model uses its own locally stored photograph and calibrated mask", () => {
  expect(tryOnProducts).toHaveLength(Object.keys(tryOnFrames).length);
  expect(tryOnProducts.length).toBeGreaterThan(0);
  for (const product of tryOnProducts) {
    const config = tryOnFrames[product.slug];
    expect(product.images.map((image) => image.src)).toContain(config.image);
    expect(existsSync(path.join(process.cwd(), "public", config.image))).toBe(true);
    expect(config.bounds[2]).toBeGreaterThan(config.bounds[3]);
    expect(config.lenses).toHaveLength(2);
    expect(config.eyeLine).toBeGreaterThan(0);
    expect(config.eyeLine).toBeLessThan(1);
    expect(config.image).toMatch(/^\/images\/collections\//);
  }
});
