export type FacePoint = { x: number; y: number; z?: number };
export type GlassesPose = {
  x: number;
  y: number;
  width: number;
  angle: number;
};

/** Coordinates stay in the unmirrored camera's pixel space. */
export function getGlassesPose(
  landmarks: FacePoint[],
  width: number,
  height: number,
): GlassesPose | null {
  const points = [33, 133, 362, 263, 168].map((index) => landmarks[index]);
  if (points.some((p) => !p || !Number.isFinite(p.x) || !Number.isFinite(p.y))) {
    return null;
  }
  if (points.some((p) => p.x < 0 || p.x > 1 || p.y < 0 || p.y > 1)) {
    return null;
  }
  const [a, b, c, d, nose] = points;
  const left = { x: ((a.x + b.x) / 2) * width, y: ((a.y + b.y) / 2) * height };
  const right = { x: ((c.x + d.x) / 2) * width, y: ((c.y + d.y) / 2) * height };
  const dx = right.x - left.x;
  const dy = right.y - left.y;
  const distance = Math.hypot(dx, dy);
  const x = (left.x + right.x) / 2;
  const y = (left.y + right.y) / 2;
  // A flat front texture needs a mostly frontal face; never keep a stale fit.
  if (distance < width * 0.055 || distance > width * 0.55 || dx <= 0) return null;
  if (Math.abs(nose.x * width - x) > distance * 0.32) return null;
  return { x, y, width: distance * 2.25, angle: Math.atan2(dy, dx) };
}

export function smoothPose(previous: GlassesPose | null, next: GlassesPose): GlassesPose {
  if (!previous || Math.hypot(next.x - previous.x, next.y - previous.y) > next.width) {
    return next;
  }
  const blend = (a: number, b: number) => a + (b - a) * 0.55;
  return {
    x: blend(previous.x, next.x),
    y: blend(previous.y, next.y),
    width: blend(previous.width, next.width),
    angle: blend(previous.angle, next.angle),
  };
}

export function cameraErrorMessage(error: unknown): string {
  const name = error instanceof Error || error instanceof DOMException ? error.name : "";
  switch (name) {
    case "NotAllowedError":
    case "PermissionDeniedError":
      return "Camera chưa được cho phép. Mở quyền camera trong phần cài đặt của trình duyệt cho trang này, rồi thử lại.";
    case "NotFoundError":
    case "DevicesNotFoundError":
      return "Không tìm thấy camera. Hãy kết nối camera hoặc mở trang bằng điện thoại có camera trước.";
    case "NotReadableError":
    case "TrackStartError":
      return "Không mở được camera. Đóng ứng dụng khác đang dùng camera, rồi thử lại.";
    default:
      return "Chưa khởi động được tính năng thử kính. Kiểm tra kết nối mạng và dùng phiên bản Chrome, Edge hoặc Safari mới, rồi thử lại.";
  }
}
