import {
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import Link from "next/link";
import { AppointmentForm } from "@/components/marketing/appointment-form";
import { HeroCarousel } from "@/components/marketing/hero-carousel";
import { eyeServices, products, stores } from "@/components/marketing/storefront-data";
import { StorefrontFooter } from "@/components/marketing/storefront-footer";
import { StorefrontHeader } from "@/components/marketing/storefront-header";
import { storefrontNavigation } from "@/components/marketing/storefront-navigation";
import { filterProducts } from "@/lib/product-filter";

const trustSignals = [
  {
    title: "4.9/5",
    copy: "Đánh giá trung bình từ khách hàng",
    icon: Star,
  },
  { title: "10.000+", copy: "Khách hàng đã tin tưởng", icon: Sparkles },
  { title: "20 năm", copy: "Kinh nghiệm phục vụ", icon: Clock },
  {
    title: "Chuẩn quốc tế",
    copy: "Quy trình đo mắt theo tiêu chuẩn khúc xạ – nhãn khoa",
    icon: ShieldCheck,
  },
];

const featuredCollections = [
  {
    title: "Classic Collection",
    subtitle: "Kính mắt",
    filterCategory: "Kính mắt",
    description: "Gọng cân đối, tối giản cho môi trường làm việc và đi học.",
    image:
      "https://images.unsplash.com/photo-1755719402885-b7baa634c755?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Titanium Series",
    subtitle: "Gọng siêu nhẹ",
    filterCategory: "Gọng kính",
    description: "Titanium nhẹ và bền cho nhu cầu nhìn rõ trong cả ngày dài.",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Summer Sunglasses",
    subtitle: "Bảo vệ UV400",
    filterCategory: "Kính mát",
    description: "Kính mát đa nhiệm, giúp bảo vệ mắt trước cường độ nắng cao.",
    image:
      "https://images.unsplash.com/photo-1625591339971-4c9a87a66871?auto=format&fit=crop&w=900&q=80",
  },
];

const reviews = [
  {
    name: "Nguyễn Anh Khoa",
    city: "Quận 1",
    quote:
      "Đo mắt rất kỹ, mình chọn được đúng mẫu phù hợp ngay lần đầu. Trải nghiệm khác hẳn những cửa hàng trước đây.",
  },
  {
    name: "Lê Minh Thư",
    city: "Quận 7",
    quote:
      "Gọng nhẹ, màu trang nhã và phần tư vấn rất rõ ràng. Mình không mất nhiều thời gian để quyết định.",
  },
  {
    name: "Phạm Tường Vy",
    city: "Bình Thạnh",
    quote:
      "Đặt lịch trước giúp mọi thứ nhanh gọn. Mình đã có thời gian thử kính và nhận tư vấn đúng nhu cầu.",
  },
];

type HomeSearchParams = Promise<{
  category?: string;
  query?: string;
}>;

type HomeProps = {
  searchParams: HomeSearchParams;
};

export default async function Home({ searchParams }: HomeProps) {
  const { category, query } = await searchParams;
  const activeProducts = filterProducts(products, { category, query });
  const hasFilters = Boolean(category || query);

  return (
    <div className="site-shell">
      <StorefrontHeader navItems={storefrontNavigation} />

      <main>
        <section className="hero-section" aria-labelledby="page-title">
          <div className="hero-copy">
            <h1 id="page-title">
              Kính thuốc Anh Thi - niềm tin và hi vọng cho đôi mắt của bạn
            </h1>

            <div className="hero-actions" aria-label="Lối tắt mua sắm">
              <Link className="primary-button" href="/#eye-exam">
                Đặt lịch đo mắt miễn phí
                <CalendarDays aria-hidden="true" size={18} strokeWidth={1.75} />
              </Link>
              <Link className="outline-button" href="/#bestsellers">
                Xem sản phẩm
                <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
              </Link>
            </div>
          </div>

          <div className="hero-media">
            <HeroCarousel />
          </div>
        </section>

        <section className="section trust-bar" aria-label="Chứng thực thương hiệu">
          <div className="trust-grid">
            {trustSignals.map((item) => {
              const Icon = item.icon;

              return (
                <article className="trust-item" key={item.title}>
                  <Icon aria-hidden="true" size={20} strokeWidth={1.75} />
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.copy}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section" id="collections" aria-labelledby="collections-title">
          <div className="section-heading">
            <h2 id="collections-title">Bộ sưu tập nổi bật</h2>
            <p>Chọn nhanh theo phong cách, chất liệu và nhu cầu sử dụng của bạn.</p>
          </div>
          <div className="collection-grid">
            {featuredCollections.map((collection) => (
              <Link
                className="collection-card"
                href={`/?category=${encodeURIComponent(collection.filterCategory)}#bestsellers`}
                key={collection.title}
              >
                <img alt={collection.title} decoding="async" loading="lazy" src={collection.image} />
                <div className="collection-meta">
                  <p>{collection.subtitle}</p>
                  <h3>{collection.title}</h3>
                  <span>{collection.description}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="section" id="bestsellers" aria-labelledby="products-title">
          <div className="product-heading-row">
            <div className="section-heading">
              <h2 id="products-title">Sản phẩm được yêu thích</h2>
              <p>Khám phá các mẫu được khách hàng lựa chọn nhiều nhất.</p>
            </div>
            {hasFilters ? (
              <div className="product-result" role="status">
                <span>
                  {activeProducts.length} mẫu phù hợp
                  {query ? ` với “${query}”` : ""}
                  {category ? ` trong ${category}` : ""}.
                </span>
                <Link href="/#bestsellers">Xem tất cả</Link>
              </div>
            ) : (
              <p className="product-count">{products.length} mẫu đang hiển thị</p>
            )}
          </div>

          {activeProducts.length ? (
            <div className="product-grid">
              {activeProducts.map((product) => (
                <article className="product-card" key={product.name}>
                  <Link href="/#locations" aria-label={`Tư vấn ${product.name}`}>
                    <img alt={product.name} decoding="async" loading="lazy" src={product.image} />
                  </Link>
                  <div className="product-info">
                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.category}</p>
                    </div>
                    <span className="product-tag">{product.tag}</span>
                    <strong>{product.price}</strong>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-product-state">
              <h3>Chưa có mẫu kính phù hợp</h3>
              <p>Thử một từ khoá khác hoặc xem toàn bộ catalogue hiện có.</p>
              <Link className="outline-button" href="/#bestsellers">
                Xem toàn bộ sản phẩm
                <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
              </Link>
            </div>
          )}
        </section>

        <section className="section service-section" id="eye-exam" aria-labelledby="services-title">
          <div className="section-heading">
            <h2 id="services-title">Dịch vụ đo mắt tại Anh Thi</h2>
            <p>Đặt lịch trước để có đủ thời gian đo mắt, thử gọng và nhận tư vấn riêng.</p>
          </div>

          <div className="service-grid">
            {eyeServices.map((service) => {
              const Icon = service.icon;

              return (
                <article className="service-item" key={service.title}>
                  <Icon aria-hidden="true" size={24} strokeWidth={1.6} />
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </article>
              );
            })}
          </div>

          <AppointmentForm />
        </section>

        <section className="section review-section" aria-labelledby="reviews-title">
          <div className="section-heading">
            <h2 id="reviews-title">Khách hàng nói gì</h2>
          </div>
          <div className="review-grid">
            {reviews.map((review) => (
              <article className="review-card" key={review.name}>
                <div className="review-stars" aria-label="5 trên 5 sao">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star aria-hidden="true" fill="currentColor" key={index} size={16} strokeWidth={1.5} />
                  ))}
                </div>
                <p>“{review.quote}”</p>
                <p className="review-meta">
                  {review.name} — {review.city}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section location-section" id="locations" aria-labelledby="locations-title">
          <div className="section-heading">
            <h2 id="locations-title">Cửa hàng</h2>
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
                <Link className="text-link" href="/#eye-exam">
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
