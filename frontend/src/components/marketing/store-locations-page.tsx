import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { StorefrontFooter } from "./storefront-footer";
import { StorefrontHeader } from "./storefront-header";
import { storefrontNavigation } from "./storefront-navigation";
import { stores } from "./storefront-data";
import { StructuredData } from "./structured-data";
import { breadcrumbSchema } from "@/lib/local-business-schema";

export function StoreLocationsPage() {
  const store = stores[0];
  return (
    <div className="site-shell">
      <StructuredData
        data={breadcrumbSchema([
          { name: "Trang chủ", path: "/" },
          { name: "Cửa hàng kính thuốc Vĩnh Long", path: "/cua-hang" },
        ])}
      />
      <StorefrontHeader navItems={storefrontNavigation} />
      <main id="main-content">
        <section
          className="page-section visit-page"
          aria-labelledby="locations-title"
        >
          <nav className="breadcrumbs" aria-label="Đường dẫn">
            <Link href="/">Trang chủ</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Cửa hàng</span>
          </nav>
          <div className="refresh-heading">
            <h1 id="locations-title">
              Cửa hàng kính thuốc Anh Thi tại Vĩnh Long.
            </h1>
            <p>
              Một chiếc gọng đẹp cần vừa với bạn. Ghé cửa hàng để thử kính và
              được căn chỉnh trực tiếp.
            </p>
          </div>
          <div className="location-invitation">
            <div>
              <MapPin size={42} strokeWidth={1} aria-hidden="true" />
              <h2>{store.name}</h2>
              <p>
                Ngay tại Vĩnh Long, cùng bạn tìm một cặp kính hợp thị lực và
                phong cách hằng ngày.
              </p>
              <a
                className="text-link"
                href={store.mapUrl}
                target="_blank"
                rel="noreferrer"
              >
                Mở vị trí trên bản đồ
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
            <div className="location-invitation__details">
              <h3>Thông tin ghé thăm</h3>
              <a href={store.mapUrl} target="_blank" rel="noreferrer">
                <MapPin size={20} aria-hidden="true" />
                {store.address}
              </a>
              <p>
                <Clock size={20} aria-hidden="true" />
                Mỗi ngày: {store.hours}
              </p>
              <a href="tel:+84858060789">
                <Phone size={20} aria-hidden="true" />
                +84 85 806 0789
              </a>
              <a
                className="primary-button"
                href={store.mapUrl}
                target="_blank"
                rel="noreferrer"
              >
                Chỉ đường
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="visit-notes">
            <div>
              <h2>Đã thích một mẫu kính?</h2>
              <p>
                Ghi lại mã mẫu hoặc mở trang chi tiết trên điện thoại. Gọi trước
                để Anh Thi kiểm tra mẫu và màu hiện có.
              </p>
              <Link className="text-link" href="/gong-kinh">
                Khám phá gọng kính
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div>
              <h2>Muốn dành thời gian đo mắt?</h2>
              <p>
                Mang theo kính và đơn kính cũ nếu có. Gọi cửa hàng để trao đổi
                nhu cầu và xác nhận thời gian phù hợp.
              </p>
              <Link className="text-link" href="/do-mat">
                Đặt lịch đo mắt
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <StorefrontFooter />
    </div>
  );
}
