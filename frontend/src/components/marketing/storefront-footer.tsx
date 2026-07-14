import Link from "next/link";

export function StorefrontFooter() {
  return (
    <footer className="site-footer">
      <p>© 2026 Kính thuốc Anh Thi</p>
      <div>
        <Link href="/#collections">Bộ sưu tập</Link>
        <Link href="/#bestsellers">Sản phẩm</Link>
        <Link href="/bac-si">Bác sĩ</Link>
        <Link href="/#eye-exam">Đo mắt</Link>
        <Link href="/#locations">Cửa hàng</Link>
      </div>
    </footer>
  );
}
