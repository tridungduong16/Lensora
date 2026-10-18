import { ArrowRight, Clock, Glasses, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import doctorAward from "../../images/doctor-award.jpg";
import { AppointmentForm } from "@/components/marketing/appointment-form";
import { BrandStoryRail } from "@/components/marketing/brand-story-rail";
import { EditorialHero } from "@/components/marketing/editorial-hero";
import { ProductCatalog } from "@/components/marketing/product-catalog";
import { OpeningHours } from "@/components/marketing/opening-hours";
import { eyeServices, stores } from "@/components/marketing/storefront-data";
import { StorefrontFooter } from "@/components/marketing/storefront-footer";
import { StorefrontHeader } from "@/components/marketing/storefront-header";
import { storefrontNavigation } from "@/components/marketing/storefront-navigation";
import { eyewearProducts } from "@/lib/eyewear-catalog";
import { HOME_DESCRIPTION, HOME_TITLE, pageMetadata } from "@/lib/site-seo";

export const metadata = pageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
});

const homeNavigation = storefrontNavigation.filter(
  (item) => item.href !== "/bang-gia",
);
const brandStories = [
  {
    name: "BOLON",
    title: "Một chút khác biệt, mỗi ngày.",
    copy: "Gọng đen, đồi mồi hay xám trong. Xem từng đường nét qua ảnh chụp tại cửa hàng.",
    product: "bolon-gong-vuong",
    className: "brand-feature--bolon",
  },
  {
    name: "EXFASH",
    title: "Dễ chọn. Dễ phối.",
    copy: "Từ gọng TR90 nhiều màu đến dòng Kids Special. So sánh các lựa chọn qua ảnh kính thật.",
    product: "exfash-ef45402",
    className: "brand-feature--exfash",
  },
  {
    name: "New Balance",
    title: "Theo nhịp chuyển động.",
    copy: "Gọng kim loại thanh mảnh, dáng bo vuông và tròn. Tìm sắc màu hợp với phong cách của bạn.",
    product: "new-balance-gong-kim-loai",
    className: "brand-feature--nb",
  },
];
const questions = [
  {
    title: "Nên bắt đầu từ dáng kính hay chất liệu?",
    copy: "Bắt đầu từ nhu cầu đeo: học tập, làm việc hay đi ngoài trời. Sau đó thử vài dáng gọng và chất liệu để so sánh độ vừa, trọng lượng và phong cách trực tiếp.",
  },
  {
    title: "Giá trên website đã gồm tròng kính chưa?",
    copy: "Giá trong danh mục được đọc từ tem trên ảnh chụp tại cửa hàng và chưa gồm tròng kính thuốc. Mẫu chưa có giá rõ được ghi Liên hệ. Tròng kính được tư vấn riêng; gọi Anh Thi để xác nhận tổng chi phí.",
  },
  {
    title: "Làm sao biết kính có vừa khuôn mặt?",
    copy: "Kiểm tra gọng có trượt mũi, ép thái dương hoặc cấn sau tai không. Mã và kích thước giúp thu hẹp lựa chọn, nhưng thử trực tiếp và căn chỉnh tại cửa hàng sẽ dễ đánh giá hơn.",
  },
  {
    title: "Có cần đặt lịch trước khi đến?",
    copy: "Bạn có thể ghé trong giờ mở cửa. Nếu muốn đo mắt hoặc dành thời gian thử nhiều mẫu, hãy gọi trước để cửa hàng xác nhận thời gian phù hợp.",
  },
];

type HomeProps = {
  searchParams: Promise<{ category?: string; query?: string; brand?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { category, query, brand } = await searchParams;
  const store = stores[0];
  return (
    <div className="site-shell">
      <StorefrontHeader navItems={homeNavigation} overlay />
      <main id="main-content">
        <EditorialHero />
        <div className="care-ribbon" aria-label="Dịch vụ tại Anh Thi">
          <p>
            <Glasses size={23} strokeWidth={1.3} aria-hidden="true" />
            <span>
              Thử gọng trực tiếp
              <strong>Tìm độ vừa, chọn đúng phong cách</strong>
            </span>
          </p>
          <p>
            <MapPin size={23} strokeWidth={1.3} aria-hidden="true" />
            <span>
              Gặp Anh Thi tại Vĩnh Long
              <strong>85 Phạm Thái Bường, Phường 4</strong>
            </span>
          </p>
          <p>
            <Clock size={23} strokeWidth={1.3} aria-hidden="true" />
            <span>
              Giờ mở cửa
              <strong>
                <OpeningHours hours={store.hours} />
              </strong>
            </span>
          </p>
        </div>
        <section
          className="page-section brand-section"
          id="collections"
          aria-labelledby="collections-title"
        >
          <div className="refresh-heading">
            <h2 id="collections-title">
              Kính thật tại cửa hàng.
              <br />
              Nhiều cách là chính bạn.
            </h2>
            <p>
              Khám phá BOLON, EXFASH, New Balance và nhiều thương hiệu khác
              qua ảnh chụp kính tại Anh Thi.
            </p>
          </div>
          <p className="brand-section__hint">
            Vuốt để khám phá 3 thương hiệu{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </p>
          <BrandStoryRail>
            {brandStories.map((story) => {
              const product = eyewearProducts.find(
                (item) => item.slug === story.product,
              )!;
              return (
                <Link
                  className={`brand-feature ${story.className}`}
                  href={`/?brand=${encodeURIComponent(story.name)}#bestsellers`}
                  key={story.name}
                >
                  <div className="brand-feature__image">
                    <span className="brand-feature__name">{story.name}</span>
                    <Image
                      src={product.images[0].src}
                      alt={product.images[0].alt}
                      width={800}
                      height={600}
                      sizes="(max-width: 760px) 80vw, 33vw"
                    />
                  </div>
                  <div className="brand-feature__copy">
                    <h3>{story.title}</h3>
                    <p>{story.copy}</p>
                  </div>
                  <span className="brand-feature__action">
                    Khám phá {story.name}
                    <ArrowRight
                      size={18}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              );
            })}
          </BrandStoryRail>
        </section>
        <section
          className="page-section catalog-section"
          id="bestsellers"
          aria-labelledby="products-title"
        >
          <div className="refresh-heading">
            <h2 id="products-title">Tìm mẫu kính của bạn.</h2>
            <p>
              Từ gọng thanh mảnh đến kính mát cá tính. Lọc theo gu của bạn và
              xem kỹ từng thiết kế.
            </p>
          </div>
          <ProductCatalog
            key={`${brand ?? ""}-${query ?? ""}-${category ?? ""}`}
            products={eyewearProducts}
            initialBrand={brand}
            initialQuery={query}
            initialCategory={category}
          />
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
                sizes="(min-width: 861px) 50vw, 100vw"
                src={doctorAward}
              />
              <p>Chăm sóc thị lực bắt đầu từ sự lắng nghe.</p>
            </div>
            <div className="clinical-story__content">
              <h2 id="eye-exam-title">
                Đo mắt tại Vĩnh Long.
                <br />
                Chọn kính phù hợp.
              </h2>
              <p className="clinical-story__intro">
                Ghé Kính thuốc Anh Thi tại 85 Phạm Thái Bường, Phường 4, Vĩnh
                Long để trao đổi nhu cầu đo mắt, tư vấn kính thuốc và thử gọng
                trực tiếp.
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
              <Link className="text-link" href="/do-mat">
                Tìm hiểu đo mắt và lịch khám mắt tại Vĩnh Long{" "}
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </div>
          </div>
          <div
            className="appointment-panel"
            aria-labelledby="appointment-title"
          >
            <div className="appointment-panel__heading">
              <h2 id="appointment-title">Đặt lịch đo mắt</h2>
              <p>
                Điền thông tin để kiểm tra. Sau đó gọi Anh Thi để xác nhận thời
                gian phù hợp.
              </p>
            </div>
            <AppointmentForm />
          </div>
        </section>
        <section
          className="page-section fitting-guide"
          aria-labelledby="guide-title"
        >
          <div>
            <Glasses size={36} strokeWidth={1.2} aria-hidden="true" />
            <h2 id="guide-title">
              Chọn kính,
              <br />
              cứ thong thả.
            </h2>
            <p>Một vài điều giúp bạn chuẩn bị trước khi thử kính.</p>
            <Link className="text-link" href="/do-mat">
              Tìm hiểu dịch vụ đo mắt
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="fitting-guide__questions">
            {questions.map((question) => (
              <details key={question.title}>
                <summary>
                  {question.title}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{question.copy}</p>
              </details>
            ))}
          </div>
        </section>
        <section
          className="page-section location-section"
          id="locations"
          aria-labelledby="locations-title"
        >
          <div className="location-invitation">
            <div>
              <span className="eyebrow">Kính thuốc Anh Thi</span>
              <h2 id="locations-title">
                Ghé Anh Thi.
                <br />
                Thử chiếc kính bạn thích.
              </h2>
              <p>Cầm trên tay, thử trước gương và cảm nhận độ vừa.</p>
            </div>
            <div className="location-invitation__details">
              <h3>{store.name}</h3>
              <a href={store.mapUrl} target="_blank" rel="noreferrer">
                <MapPin size={20} aria-hidden="true" />
                {store.address}
              </a>
              <p>
                <Clock size={20} aria-hidden="true" />
                <OpeningHours hours={store.hours} />
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
        </section>
      </main>
      <StorefrontFooter showPriceList={false} />
    </div>
  );
}
