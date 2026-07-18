import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import doctorAward from "../../images/doctor-award.jpg";
import { AppointmentForm } from "@/components/marketing/appointment-form";
import { EditorialHero } from "@/components/marketing/editorial-hero";
import {
  eyeServices,
  products,
  stores,
} from "@/components/marketing/storefront-data";
import { StorefrontFooter } from "@/components/marketing/storefront-footer";
import { StorefrontHeader } from "@/components/marketing/storefront-header";
import { storefrontNavigation } from "@/components/marketing/storefront-navigation";
import { filterProducts } from "@/lib/product-filter";

const trustSignals = [
  "★★★★★ 4.9",
  "10.000+ khách hàng",
  "20 năm kinh nghiệm",
  "100+ thương hiệu",
] as const;

const featuredCollections = [
  {
    title: "Classic Collection",
    subtitle: "Kính mắt",
    filterCategory: "Kính mắt",
    description: "Gọng cân đối, tối giản cho môi trường làm việc và đi học.",
    image:
      "https://images.unsplash.com/photo-1755719402885-b7baa634c755?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Titanium Series",
    subtitle: "Gọng siêu nhẹ",
    filterCategory: "Gọng kính",
    description: "Titanium nhẹ và bền cho nhu cầu nhìn rõ trong cả ngày dài.",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Summer Sunglasses",
    subtitle: "Bảo vệ UV400",
    filterCategory: "Kính mát",
    description: "Kính mát đa nhiệm, giúp bảo vệ mắt trước cường độ nắng cao.",
    image:
      "https://images.unsplash.com/photo-1625591339971-4c9a87a66871?auto=format&fit=crop&w=1000&q=85",
  },
] as const;

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
] as const;

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
      <StorefrontHeader navItems={storefrontNavigation} overlay />

      <main id="main-content">
        <EditorialHero />

        <section className="trust-strip" aria-label="Chứng thực thương hiệu">
          <div className="trust-strip__track">
            {trustSignals.map((signal) => (
              <div className="trust-signal" key={signal}>
                <strong>{signal}</strong>
              </div>
            ))}
          </div>
        </section>

        <section
          className="page-section collections-section"
          id="collections"
          aria-labelledby="collections-title"
        >
          <div className="section-heading section-heading--ruled">
            <h2 id="collections-title">Bộ sưu tập nổi bật</h2>
            <span aria-hidden="true" />
          </div>

          <div className="collection-grid">
            {featuredCollections.map((collection, index) => (
              <Link
                className={
                  index === 0
                    ? "collection-card collection-card--featured"
                    : "collection-card"
                }
                href={`/?category=${encodeURIComponent(collection.filterCategory)}#bestsellers`}
                key={collection.title}
              >
                <div className="collection-card__media">
                  <img
                    alt={collection.title}
                    decoding="async"
                    loading={index === 0 ? "eager" : "lazy"}
                    src={collection.image}
                  />
                </div>
                <div className="collection-card__content">
                  <p>{collection.subtitle}</p>
                  <h3>{collection.title}</h3>
                  <span>{collection.description}</span>
                  <span className="collection-card__action">
                    Khám phá ngay
                    <ArrowRight aria-hidden="true" size={18} strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section
          className="page-section products-section"
          id="bestsellers"
          aria-labelledby="products-title"
        >
          <div className="product-heading-row">
            <div className="section-heading section-heading--ruled">
              <h2 id="products-title">Sản phẩm được yêu thích</h2>
              <span aria-hidden="true" />
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
                    <img
                      alt={product.name}
                      decoding="async"
                      loading="lazy"
                      src={product.image}
                    />
                  </Link>
                  <div className="product-info">
                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.category}</p>
                    </div>
                    <span className="product-tag">{product.tag}</span>
                    <strong>{product.price}</strong>
                    <Link className="product-consultation" href="/#locations">
                      Tư vấn tại cửa hàng
                      <ArrowRight
                        aria-hidden="true"
                        size={16}
                        strokeWidth={1.5}
                      />
                    </Link>
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

        <section
          className="page-section eye-exam-section"
          id="eye-exam"
          aria-labelledby="eye-exam-title"
        >
          <div className="clinical-story">
            <div className="clinical-story__media">
              <Image
                alt="Bác sĩ Anh Thi nhận bằng khen tại Bệnh viện Mắt Vĩnh Long"
                className="clinical-story__image"
                placeholder="blur"
                sizes="(min-width: 861px) 45vw, 100vw"
                src={doctorAward}
              />
            </div>

            <div className="clinical-story__content">
              <h2 id="eye-exam-title">Đo mắt kỹ. Chọn kính đúng.</h2>
              <p className="clinical-story__intro">
                Mỗi đôi kính bắt đầu từ một quy trình đo mắt cẩn thận, để chỉ số,
                gọng và tròng kính phù hợp hơn với nhu cầu hằng ngày.
              </p>

              <ol className="service-process">
                {eyeServices.map((service, index) => (
                  <li key={service.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{service.title}</h3>
                      <p>{service.copy}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <Link className="text-link clinical-story__link" href="/bac-si">
                Gặp gỡ bác sĩ Anh Thi
                <ArrowRight aria-hidden="true" size={18} strokeWidth={1.5} />
              </Link>
            </div>
          </div>

          <div className="appointment-panel" aria-labelledby="appointment-title">
            <div className="appointment-panel__heading">
              <h2 id="appointment-title">Đặt lịch đo mắt</h2>
              <p>
                Chọn nhu cầu của bạn. Anh Thi sẽ liên hệ để thống nhất thời gian
                phù hợp.
              </p>
            </div>
            <AppointmentForm />
          </div>
        </section>

        <section
          className="page-section review-section"
          aria-labelledby="reviews-title"
        >
          <div className="section-heading section-heading--centered">
            <h2 id="reviews-title">Khách hàng nói gì</h2>
          </div>

          <div className="review-layout">
            <article className="review-card review-card--featured">
              <span className="review-quote-mark" aria-hidden="true">
                “
              </span>
              <p>“{reviews[0].quote}”</p>
              <div className="review-card__footer">
                <span className="review-stars" aria-label="5 trên 5 sao">
                  ★★★★★
                </span>
                <p className="review-meta">
                  <strong>{reviews[0].name}</strong>
                  <span>{reviews[0].city}</span>
                </p>
              </div>
            </article>

            <div className="review-stack">
              {reviews.slice(1).map((review) => (
                <article className="review-card" key={review.name}>
                  <span className="review-quote-mark" aria-hidden="true">
                    “
                  </span>
                  <p>“{review.quote}”</p>
                  <div className="review-card__footer">
                    <p className="review-meta">
                      <strong>{review.name}</strong>
                      <span>{review.city}</span>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="page-section location-section"
          id="locations"
          aria-labelledby="locations-title"
        >
          <div className="section-heading section-heading--centered">
            <h2 id="locations-title">Ghé Anh Thi</h2>
            <p>Thử kính và căn chỉnh trực tiếp tại cửa hàng ở Vĩnh Long.</p>
          </div>

          <div className="store-grid">
            {stores.map((store) => (
              <article className="store-card" key={store.name}>
                <div className="store-card__identity">
                  <MapPin aria-hidden="true" size={22} strokeWidth={1.5} />
                  <div>
                    <h3>{store.name}</h3>
                    <a
                      className="store-address"
                      href={store.mapUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {store.address}
                    </a>
                  </div>
                </div>

                <p className="store-hours">
                  <Clock aria-hidden="true" size={20} strokeWidth={1.5} />
                  Mở cửa mỗi ngày: {store.hours}
                </p>

                <div className="store-actions">
                  <a href={store.mapUrl} rel="noreferrer" target="_blank">
                    Chỉ đường
                    <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
                  </a>
                  <Link href="/#eye-exam">
                    Đặt lịch tại cửa hàng
                    <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
                  </Link>
                  <a href="tel:0908123456">
                    <Phone aria-hidden="true" size={17} strokeWidth={1.5} />
                    0908 123 456
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <StorefrontFooter />
    </div>
  );
}
