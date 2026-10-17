import Link from "next/link";
import { stores } from "@/components/marketing/storefront-data";
import { OpeningHours } from "./opening-hours";

type StorefrontFooterProps = {
  showPriceList?: boolean;
};

export function StorefrontFooter({
  showPriceList = true,
}: StorefrontFooterProps) {
  const store = stores[0];

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Link href="/" title="Trang chủ Kính thuốc Anh Thi">
            <span>ANH THI</span>
            <small>EYEGLASSES</small>
          </Link>
          <p>Nhìn rõ hơn. Sống trọn từng khoảnh khắc.</p>
        </div>

        <nav
          className="site-footer__navigation"
          aria-label="Điều hướng cuối trang"
        >
          <p>Khám phá</p>
          <Link href="/#collections">Bộ sưu tập</Link>
          <Link href="/#bestsellers">Sản phẩm</Link>
          {showPriceList ? (
            <Link href="/bang-gia">Bảng giá tròng kính</Link>
          ) : null}
          <Link href="/bac-si">Bác sĩ</Link>
          <Link href="/#eye-exam">Đo mắt</Link>
          <Link href="/#locations">Cửa hàng</Link>
        </nav>

        <div className="site-footer__contact">
          <p>Liên hệ</p>
          <a href="tel:+84858060789">+84 85 806 0789</a>
          <a href={store.mapUrl} rel="noreferrer" target="_blank">
            {store.address}
          </a>
          <OpeningHours hours={store.hours} />
        </div>
      </div>

      <div className="site-footer__meta">
        <p>© 2026 Kính thuốc Anh Thi</p>
      </div>
    </footer>
  );
}
