import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  Menu,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";
import logo from "../../logo.jpg";
import modelImage from "../../models.png";

const navItems = [
  { label: "Kính mắt", href: "#collections" },
  { label: "Kính mát", href: "#collections" },
  { label: "Gọng kính", href: "#collections" },
  { label: "Đo mắt", href: "#eye-exam" },
  { label: "Cửa hàng", href: "#locations" },
];

const trustSignals = [
  {
    title: "★★★★★ 4.9/5",
    copy: "Đánh giá trung bình từ khách hàng",
    icon: Star,
  },
  { title: "10,000+", copy: "Khách hàng đã tin tưởng", icon: Sparkles },
  { title: "20 năm", copy: "Kinh nghiệm phục vụ", icon: Clock },
  {
    title: "Chuẩn quốc tế",
    copy: "Quy trình đo mắt theo tiêu chuẩn nha khoa – nhãn khoa",
    icon: ShieldCheck,
  },
];

const featuredCollections = [
  {
    title: "Classic Collection",
    subtitle: "Kính mắt",
    description: "Kính gọng cân đối, tối giản, phù hợp môi trường làm việc và đi học.",
    image:
      "https://images.unsplash.com/photo-1755719402885-b7baa634c755?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Titanium Series",
    subtitle: "Gọng siêu nhẹ",
    description:
      "Dòng titanium nhẹ và bền cho nhu cầu nhìn rõ cả ngày dài trên đường phố đô thị.",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Summer Sunglasses",
    subtitle: "UV400 Protection",
    description: "Kính mát đa nhiệm, bảo vệ mắt khỏi ánh nắng mặt trời và phơi sáng.",
    image:
      "https://images.unsplash.com/photo-1625591339971-4c9a87a66871?auto=format&fit=crop&w=900&q=80",
  },
];

const products = [
  {
    name: "Anh Thi Classic 01",
    category: "Kính mắt",
    tag: "Best seller",
    price: "1.250.000₫",
    image:
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Minimal Titanium 22",
    category: "Gọng kính",
    tag: "Ultra light",
    price: "1.680.000₫",
    image:
      "https://images.unsplash.com/photo-1755719402885-b7baa634c755?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Sunline Polar",
    category: "Kính mát",
    tag: "UV400",
    price: "1.450.000₫",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Everyday Blue",
    category: "Tròng kính",
    tag: "Blue light",
    price: "890.000₫",
    image:
      "https://images.unsplash.com/photo-1625591339971-4c9a87a66871?auto=format&fit=crop&w=900&q=80",
  },
];

const eyeServices = [
  {
    icon: CalendarDays,
    title: "Đo mắt theo lịch",
    copy: "Nhân viên thẩm định thị lực trước, chọn đúng chỉ số để phù hợp công việc.",
  },
  {
    icon: Sparkles,
    title: "Tư vấn dáng khuôn mặt",
    copy: "Lựa chọn gọng theo hình dáng mặt, lối sống, môi trường sử dụng.",
  },
  {
    icon: ShieldCheck,
    title: "Lắp kính nhanh",
    copy: "Vệ sinh, căn chỉnh và hướng dẫn bảo dưỡng sau mua tại cửa hàng.",
  },
];

const reviews = [
  {
    name: "Nguyễn Anh Khoa",
    city: "Quận 1",
    quote:
      "Đo mắt cực sát sao, chọn được đúng mẫu phù hợp ngay lần đầu. Mình thấy khác hẳn trải nghiệm khi mua ở cửa hàng trước.",
  },
  {
    name: "Lê Minh Thư",
    city: "Quận 7",
    quote:
      "Gọng gọn, gọn nhẹ, màu sắc trang nhã. Tư vấn kiểu sản phẩm rất giống thương hiệu cao cấp.",
  },
  {
    name: "Phạm Tường Vy",
    city: "Bình Thạnh",
    quote:
      "Lịch hẹn đặt trước giúp thao tác nhanh gọn. Chốt lịch đo mắt và lấy mẫu kính đúng nhu cầu rất dễ.",
  },
];

const stores = [
  {
    name: "Chi nhánh Quận 1",
    address: "129 Trần Hưng Đạo, Quận 1, TP. HCM",
    hours: "08:30 - 21:00",
  },
  {
    name: "Chi nhánh Bình Thạnh",
    address: "18 Nguyễn Thiện Thuật, Bình Thạnh, TP. HCM",
    hours: "09:00 - 20:30",
  },
];

export default function Home() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#" aria-label="Anh Thi">
          <Image
            alt="Anh Thi"
            className="brand-logo"
            height={56}
            src={logo}
            width={56}
          />
        </a>

        <nav className="desktop-nav" aria-label="Điều hướng chính">
          {navItems.map((item) => (
            <a href={item.href} key={item.label}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <form className="search-form" role="search">
            <Search aria-hidden="true" size={18} strokeWidth={1.75} />
            <input
              aria-label="Tìm kính"
              placeholder="Tìm gọng kính, thương hiệu, dạng kính..."
              type="search"
            />
          </form>
          <a className="mobile-menu" href="#menu" aria-label="Mở menu">
            <Menu aria-hidden="true" size={21} strokeWidth={1.75} />
          </a>
        </div>
      </header>

      <main>
        <section className="hero-section" aria-labelledby="page-title">
          <div className="hero-copy">
            <p className="eyebrow">Premium eyewear / prescription glasses</p>
            <h1 id="page-title">Kính Anh Thi — rõ hơn từng chi tiết.</h1>
            <p className="hero-description">
              Gọng kính, kính mát và dịch vụ đo mắt được thiết kế theo tiêu chuẩn
              thương hiệu cao cấp: tinh gọn, bền và dễ phối đồ.
            </p>

            <div className="hero-actions" aria-label="Lối tắt mua sắm">
              <a className="primary-button" href="#eye-exam">
                Đặt lịch đo mắt miễn phí
                <CalendarDays aria-hidden="true" size={18} strokeWidth={1.75} />
              </a>
              <a className="outline-button" href="#bestsellers">
                Xem sản phẩm
                <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
              </a>
            </div>
          </div>

          <div className="hero-media" aria-hidden="true">
            <Image
              alt="Người mẫu đeo kính Anh Thi"
              priority
              src={modelImage}
              className="hero-image"
              sizes="(min-width: 900px) 42vw, 100vw"
              placeholder="empty"
            />
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
            <p className="eyebrow">Featured Collections</p>
            <h2 id="collections-title">Bộ sưu tập nổi bật</h2>
          </div>
          <div className="collection-grid">
            {featuredCollections.map((collection) => (
              <a
                className="collection-card"
                href="#bestsellers"
                key={collection.title}
              >
                <img src={collection.image} alt={collection.title} />
                <div className="collection-meta">
                  <p>{collection.subtitle}</p>
                  <h3>{collection.title}</h3>
                  <p>{collection.description}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="section" id="bestsellers" aria-labelledby="products-title">
          <div className="section-heading inline-heading">
            <div>
              <p className="eyebrow">Best Sellers</p>
              <h2 id="products-title">Sản phẩm bán chạy</h2>
            </div>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.name}>
                <a href="#locations" aria-label={`Xem ${product.name}`}>
                  <img src={product.image} alt={product.name} />
                </a>
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
        </section>

        <section className="section service-section" id="eye-exam" aria-labelledby="services-title">
          <div className="section-heading">
            <p className="eyebrow">Eye Examination Service</p>
            <h2 id="services-title">Dịch vụ đo mắt tại Anh Thi</h2>
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

          <form className="appointment-form">
            <label>
              Họ và tên
              <input type="text" placeholder="Nguyễn Anh" />
            </label>
            <label>
              Số điện thoại
              <input type="tel" placeholder="0900 000 000" />
            </label>
            <label>
              Nhu cầu
              <select defaultValue="eye-test">
                <option value="eye-test">Đo mắt và tư vấn kính thuốc</option>
                <option value="sunglasses">Tư vấn kính mát theo khuôn mặt</option>
                <option value="frames">Tìm gọng kính theo nhu cầu công việc</option>
              </select>
            </label>
            <button className="primary-button form-submit" type="submit">
              Gửi lịch hẹn
              <Check aria-hidden="true" size={18} strokeWidth={1.75} />
            </button>
          </form>
        </section>

        <section className="section review-section" id="reviews" aria-labelledby="reviews-title">
          <div className="section-heading">
            <p className="eyebrow">Customer Reviews</p>
            <h2 id="reviews-title">Khách hàng nói gì</h2>
          </div>
          <div className="review-grid">
            {reviews.map((review) => (
              <article className="review-card" key={review.name}>
                <div className="review-stars" aria-hidden="true">
                  <Star size={16} fill="currentColor" strokeWidth={1.5} />
                  <Star size={16} fill="currentColor" strokeWidth={1.5} />
                  <Star size={16} fill="currentColor" strokeWidth={1.5} />
                  <Star size={16} fill="currentColor" strokeWidth={1.5} />
                  <Star size={16} fill="currentColor" strokeWidth={1.5} />
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
            <p className="eyebrow">Store Locations</p>
            <h2 id="locations-title">Cửa hàng</h2>
          </div>

          <div className="store-grid">
            {stores.map((store) => (
              <article className="store-card" key={store.name}>
                <h3>{store.name}</h3>
                <p>{store.address}</p>
                <p>{store.hours}</p>
                <a className="text-link" href="#eye-exam">
                  Đặt lịch tại cửa hàng
                  <ArrowRight aria-hidden="true" size={16} />
                </a>
              </article>
            ))}
          </div>

          <div className="store-meta">
            <p>
              <MapPin aria-hidden="true" size={18} strokeWidth={1.75} />
              128 Nguyễn Trãi, Quận 5, TP. HCM
            </p>
            <p>
              <Clock aria-hidden="true" size={18} strokeWidth={1.75} />
              08:30 - 20:30 hằng ngày
            </p>
            <p>
              <Phone aria-hidden="true" size={18} strokeWidth={1.75} />
              0908 123 456
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© 2026 Anh Thi</p>
        <div>
          <a href="#collections">Bộ sưu tập</a>
          <a href="#bestsellers">Sản phẩm</a>
          <a href="#eye-exam">Đo mắt</a>
          <a href="#locations">Cửa hàng</a>
        </div>
      </footer>
    </div>
  );
}
