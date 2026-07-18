import Link from "next/link";

export function StorefrontFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Link href="/" aria-label="Trang chủ Kính thuốc Anh Thi">
            <span>ANH THI</span>
            <small>EYEGLASSES</small>
          </Link>
          <p>Nhìn rõ hơn. Sống trọn từng khoảnh khắc.</p>
        </div>

        <nav className="site-footer__navigation" aria-label="Điều hướng cuối trang">
          <p>Khám phá</p>
          <Link href="/#collections">Bộ sưu tập</Link>
          <Link href="/#bestsellers">Sản phẩm</Link>
          <Link href="/bac-si">Bác sĩ</Link>
          <Link href="/#eye-exam">Đo mắt</Link>
          <Link href="/#locations">Cửa hàng</Link>
        </nav>

        <div className="site-footer__contact">
          <p>Liên hệ</p>
          <a href="tel:0908123456">0908 123 456</a>
          <span>85 Phạm Thái Bường, Phường 4, Vĩnh Long</span>
          <span>Mở cửa mỗi ngày: 09:00 – 20:30</span>
        </div>
      </div>

      <div className="site-footer__meta">
        <p>© 2026 Kính thuốc Anh Thi</p>
      </div>
    </footer>
  );
}
