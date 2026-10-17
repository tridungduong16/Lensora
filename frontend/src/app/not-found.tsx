import Link from "next/link";
import { Glasses } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found">
      <Glasses size={64} strokeWidth={1} aria-hidden="true" />
      <p>Không tìm thấy trang này</p>
      <h1>
        Cùng tìm một
        <br />
        góc nhìn khác.
      </h1>
      <p>Trang hoặc mẫu kính bạn muốn xem hiện không có tại đường dẫn này.</p>
      <Link className="primary-button" href="/">
        Về trang chủ
      </Link>
      <Link className="text-link" href="/gong-kinh">
        Khám phá gọng kính
      </Link>
    </main>
  );
}
