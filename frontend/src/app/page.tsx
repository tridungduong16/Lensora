import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  Heart,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

const categories = [
  {
    name: "Gọng kính thuốc",
    description: "Titanium, acetate và gọng nhẹ cho đeo cả ngày.",
    image:
      "https://images.unsplash.com/photo-1755719402885-b7baa634c755?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Kính mát",
    description: "UV400, polarized và dáng thời trang tối giản.",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Tròng kính",
    description: "Chống ánh sáng xanh, đổi màu và đa tròng.",
    image:
      "https://images.unsplash.com/photo-1625591339971-4c9a87a66871?auto=format&fit=crop&w=900&q=80",
  },
];

const products = [
  {
    name: "Anh Thi Classic 01",
    type: "Gọng acetate",
    price: "1.250.000₫",
    image:
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Minimal Titanium 22",
    type: "Gọng titanium",
    price: "1.680.000₫",
    image:
      "https://images.unsplash.com/photo-1755719402885-b7baa634c755?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Sunline Polar",
    type: "Kính mát polarized",
    price: "1.450.000₫",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Everyday Blue",
    type: "Tròng chống ánh sáng xanh",
    price: "890.000₫",
    image:
      "https://images.unsplash.com/photo-1625591339971-4c9a87a66871?auto=format&fit=crop&w=900&q=80",
  },
];

const services = [
  {
    icon: CalendarDays,
    title: "Đo mắt theo lịch",
    copy: "Đặt lịch trước để được kiểm tra thị lực trong khung giờ phù hợp.",
  },
  {
    icon: Sparkles,
    title: "Tư vấn dáng mặt",
    copy: "Chọn gọng theo khuôn mặt, thói quen sử dụng và phong cách cá nhân.",
  },
  {
    icon: ShieldCheck,
    title: "Bảo hành chỉnh gọng",
    copy: "Căn chỉnh, vệ sinh và hỗ trợ sau mua tại cửa hàng.",
  },
];

const collections = [
  "Gọng nhẹ cho văn phòng",
  "Kính học sinh",
  "Kính lái xe ban ngày",
  "Tròng đổi màu",
  "Kính mát nữ",
  "Gọng nam tối giản",
];

const faqs = [
  {
    question: "Có cần đặt lịch trước khi đo mắt không?",
    answer:
      "Không bắt buộc, nhưng đặt lịch giúp cửa hàng chuẩn bị khung giờ tư vấn riêng và giảm thời gian chờ.",
  },
  {
    question: "Bao lâu có thể nhận kính thuốc?",
    answer:
      "Một số độ phổ biến có thể hoàn thiện trong ngày. Tròng đặc biệt như đa tròng hoặc đổi màu sẽ cần thêm thời gian.",
  },
  {
    question: "Có hỗ trợ chỉnh gọng sau khi mua không?",
    answer:
      "Có. Anh Thi hỗ trợ vệ sinh, căn chỉnh gọng và kiểm tra độ vừa vặn sau mua tại cửa hàng.",
  },
];

export default function Home() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#" aria-label="Kính thuốc Anh Thi">
          <span>Kính thuốc</span>
          <strong>Anh Thi</strong>
        </a>

        <nav className="desktop-nav" aria-label="Điều hướng chính">
          <a href="#collections">Bộ sưu tập</a>
          <a href="#products">Sản phẩm</a>
          <a href="#services">Dịch vụ</a>
          <a href="#visit">Cửa hàng</a>
        </nav>

        <div className="header-actions">
          <form className="search-form" role="search">
            <Search aria-hidden="true" size={18} strokeWidth={1.75} />
            <input aria-label="Tìm kính" placeholder="Tìm kính" type="search" />
          </form>
          <a className="icon-button" href="#products" aria-label="Lọc sản phẩm">
            <SlidersHorizontal aria-hidden="true" size={19} strokeWidth={1.75} />
          </a>
          <a className="icon-button" href="#wishlist" aria-label="Danh sách yêu thích">
            <Heart aria-hidden="true" size={19} strokeWidth={1.75} />
          </a>
          <a className="icon-button" href="#cart" aria-label="Giỏ hàng">
            <ShoppingBag aria-hidden="true" size={19} strokeWidth={1.75} />
          </a>
          <a className="mobile-menu" href="#menu" aria-label="Mở menu">
            <Menu aria-hidden="true" size={21} strokeWidth={1.75} />
          </a>
        </div>
      </header>

      <main>
        <section className="intro-section" aria-labelledby="page-title">
          <div className="intro-copy">
            <p className="eyebrow">Optical store / prescription eyewear</p>
            <h1 id="page-title">Kính thuốc Anh Thi</h1>
            <p>
              Gọng kính, tròng kính và kính mát được chọn lọc cho nhu cầu nhìn rõ
              mỗi ngày, với trải nghiệm mua sắm gọn, sáng và chính xác.
            </p>
          </div>

          <div className="intro-actions" aria-label="Lối tắt mua sắm">
            <a className="primary-button" href="#visit">
              Đặt lịch đo mắt
              <CalendarDays aria-hidden="true" size={18} strokeWidth={1.75} />
            </a>
            <a className="outline-button" href="#products">
              Xem sản phẩm
              <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
            </a>
          </div>

          <div className="hero-grid">
            {categories.map((category) => (
              <a className="category-tile" href="#products" key={category.name}>
                <img src={category.image} alt={category.name} />
                <span>{category.name}</span>
                <p>{category.description}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="section" id="collections" aria-labelledby="collections-title">
          <div className="section-heading">
            <p className="eyebrow">Shop by need</p>
            <h2 id="collections-title">Chọn theo nhu cầu sử dụng</h2>
          </div>
          <div className="collection-grid">
            {collections.map((item) => (
              <a href="#products" key={item}>
                {item}
                <ArrowRight aria-hidden="true" size={17} strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </section>

        <section className="section" id="products" aria-labelledby="products-title">
          <div className="section-heading inline-heading">
            <div>
              <p className="eyebrow">Featured selection</p>
              <h2 id="products-title">Sản phẩm nổi bật</h2>
            </div>
            <div className="filter-row" aria-label="Bộ lọc nhanh">
              <button type="button">Tất cả</button>
              <button type="button">Gọng kính</button>
              <button type="button">Kính mát</button>
              <button type="button">Tròng kính</button>
            </div>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.name}>
                <a href="#visit" aria-label={`Xem ${product.name}`}>
                  <img src={product.image} alt={product.name} />
                </a>
                <div className="product-info">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.type}</p>
                  </div>
                  <strong>{product.price}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section service-section" id="services" aria-labelledby="services-title">
          <div className="section-heading">
            <p className="eyebrow">In-store care</p>
            <h2 id="services-title">Dịch vụ tại Anh Thi</h2>
          </div>
          <div className="service-grid">
            {services.map((service) => {
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
        </section>

        <section className="visit-section" id="visit" aria-labelledby="visit-title">
          <div className="visit-image">
            <img
              src="https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=1200&q=80"
              alt="Khách hàng đang thử kính tại cửa hàng"
            />
          </div>

          <div className="visit-content">
            <p className="eyebrow">Visit the store</p>
            <h2 id="visit-title">Đặt lịch đo mắt và tư vấn gọng</h2>
            <p>
              Gửi thông tin cơ bản để Anh Thi chuẩn bị lịch đo mắt, kiểm tra độ
              phù hợp của gọng và tư vấn tròng kính theo nhu cầu sử dụng.
            </p>

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
                  <option value="eye-test">Đo mắt và cắt kính thuốc</option>
                  <option value="frames">Tư vấn chọn gọng</option>
                  <option value="sunglasses">Chọn kính mát</option>
                </select>
              </label>
              <button className="primary-button form-submit" type="submit">
                Gửi lịch hẹn
                <Check aria-hidden="true" size={18} strokeWidth={1.75} />
              </button>
            </form>

            <div className="store-meta">
              <p>
                <MapPin aria-hidden="true" size={18} strokeWidth={1.75} />
                128 Nguyễn Trãi, Quận 5, TP. Hồ Chí Minh
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
          </div>
        </section>

        <section className="section faq-section" aria-labelledby="faq-title">
          <div className="section-heading">
            <p className="eyebrow">Before you visit</p>
            <h2 id="faq-title">Câu hỏi thường gặp</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© 2026 Kính thuốc Anh Thi</p>
        <div>
          <a href="#collections">Bộ sưu tập</a>
          <a href="#products">Sản phẩm</a>
          <a href="#visit">Liên hệ</a>
        </div>
      </footer>
    </div>
  );
}
