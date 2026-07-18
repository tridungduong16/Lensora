import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { StorefrontFooter } from "@/components/marketing/storefront-footer";
import { StorefrontHeader } from "@/components/marketing/storefront-header";
import { storefrontNavigation } from "@/components/marketing/storefront-navigation";
import { stores } from "@/components/marketing/storefront-data";

export function StoreLocationsPage() {
  return (
    <div className="site-shell">
      <StorefrontHeader navItems={storefrontNavigation} />

      <main>
        <section className="section location-section" aria-labelledby="locations-title">
          <div className="section-heading">
            <h1 id="locations-title">Cửa hàng</h1>
            <p>Ghé cửa hàng để được thử kính và căn chỉnh trực tiếp.</p>
          </div>

          <div className="store-grid">
            {stores.map((store) => (
              <article className="store-card" key={store.name}>
                <h3>{store.name}</h3>
                <a
                  className="store-address"
                  href={store.mapUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  {store.address}
                </a>
                <p>{store.hours}</p>
                <Link className="text-link" href="/do-mat">
                  Đặt lịch tại cửa hàng
                  <ArrowRight aria-hidden="true" size={16} />
                </Link>
              </article>
            ))}
          </div>

          <div className="store-contact">
            <p>
              <MapPin aria-hidden="true" size={18} strokeWidth={1.75} />
              Tư vấn trực tiếp tại cửa hàng ở Vĩnh Long
            </p>
            <p>
              <Clock aria-hidden="true" size={18} strokeWidth={1.75} />
              Mở cửa mỗi ngày từ 09:00 – 20:30
            </p>
            <a href="tel:0908123456">
              <Phone aria-hidden="true" size={18} strokeWidth={1.75} />
              0908 123 456
            </a>
          </div>
        </section>
      </main>

      <StorefrontFooter />
    </div>
  );
}
