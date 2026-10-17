import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import doctorAward from "../../../images/doctor-award.jpg";
import { AppointmentForm } from "./appointment-form";
import { StorefrontFooter } from "./storefront-footer";
import { StorefrontHeader } from "./storefront-header";
import { storefrontNavigation } from "./storefront-navigation";
import { eyeServices } from "./storefront-data";
import { StructuredData } from "./structured-data";
import { breadcrumbSchema } from "@/lib/local-business-schema";
import { absoluteUrl, SITE_URL } from "@/lib/site-seo";

const examQuestions = [
  {
    question: "Tìm nơi khám mắt ở Vĩnh Long: cần hỏi gì trước khi đến?",
    answer:
      "Khi liên hệ, hãy cho biết bạn cần đo mắt để làm kính hay muốn khám với bác sĩ chuyên khoa mắt. Gọi 085 806 0789 để hỏi dịch vụ phù hợp, lịch bác sĩ và thời gian tiếp nhận trước khi đến; giờ mở cửa cửa hàng không đồng nghĩa với lịch khám của bác sĩ.",
  },
  {
    question: "Đo mắt tại Anh Thi gồm những bước nào?",
    answer:
      "Bạn trao đổi nhu cầu nhìn và thói quen sử dụng kính, kiểm tra thị lực rồi được tư vấn lựa chọn gọng và tròng kính. Các bước thực hiện và chi phí cụ thể được cửa hàng xác nhận khi trao đổi trực tiếp.",
  },
  {
    question: "Cần mang theo gì khi đi đo mắt tại Vĩnh Long?",
    answer:
      "Bạn có thể mang kính đang dùng, đơn kính cũ nếu có và ghi lại những bất tiện khi nhìn hoặc đeo kính. Gọi trước để xác nhận thời gian và các hướng dẫn chuẩn bị phù hợp với nhu cầu của bạn.",
  },
];

export function EyeExamPage() {
  return (
    <div className="site-shell">
      <StructuredData
        data={breadcrumbSchema([
          { name: "Trang chủ", path: "/" },
          { name: "Đo mắt Vĩnh Long", path: "/do-mat" },
        ])}
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Đo mắt và tư vấn kính thuốc tại Vĩnh Long",
          serviceType: "Đo mắt và tư vấn kính thuốc",
          url: absoluteUrl("/do-mat"),
          provider: { "@id": `${SITE_URL}/#store` },
          areaServed: { "@type": "AdministrativeArea", name: "Vĩnh Long" },
        }}
      />
      <StorefrontHeader navItems={storefrontNavigation} />
      <main id="main-content">
        <section
          className="page-section exam-page"
          aria-labelledby="eye-exam-title"
        >
          <nav className="breadcrumbs" aria-label="Đường dẫn">
            <Link href="/">Trang chủ</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Đo mắt</span>
          </nav>
          <div className="exam-intro">
            <div>
              <h1 id="eye-exam-title">
                Đo mắt tại Vĩnh Long.
                <br />
                Chọn kính phù hợp.
              </h1>
              <p>
                Đo mắt và tư vấn kính thuốc tại Kính thuốc Anh Thi, 85 Phạm Thái
                Bường, Phường 4, Vĩnh Long. Trao đổi nhu cầu học tập, làm việc
                và sử dụng kính để được tư vấn khi đến cửa hàng.
              </p>
              <a className="primary-button" href="tel:+84858060789">
                <Phone size={18} aria-hidden="true" />
                Gọi đặt lịch
              </a>
              <Link className="text-link" href="/bac-si">
                Gặp gỡ bác sĩ Anh Thi
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <Image
              alt="Bác sĩ Anh Thi nhận bằng khen tại Bệnh viện Mắt Vĩnh Long"
              src={doctorAward}
              sizes="(max-width: 860px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="exam-process" aria-label="Trải nghiệm tại cửa hàng">
            {eyeServices.map((service, index) => (
              <article key={service.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{service.title}</h2>
                <p>{service.copy}</p>
              </article>
            ))}
          </div>
          <section className="exam-faq" aria-labelledby="exam-faq-title">
            <h2 id="exam-faq-title">Đo mắt và nhu cầu khám mắt ở Vĩnh Long</h2>
            <p>
              Chọn đúng dịch vụ bắt đầu từ việc trao đổi rõ nhu cầu. Thông tin
              dưới đây giúp bạn chuẩn bị trước khi liên hệ Anh Thi.
            </p>
            <div className="fitting-guide__questions">
              {examQuestions.map(({ question, answer }) => (
                <details key={question}>
                  <summary>
                    {question}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
            <Link className="text-link" href="/cua-hang">
              Địa chỉ và giờ mở cửa tại Vĩnh Long{" "}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </section>
          <div className="appointment-panel">
            <div className="appointment-panel__heading">
              <h2>Chuẩn bị cho lịch hẹn</h2>
              <p>
                Chọn nhu cầu của bạn, sau đó gọi cửa hàng để xác nhận giờ ghé.
                Mang theo kính hoặc đơn kính cũ nếu có.
              </p>
            </div>
            <AppointmentForm />
          </div>
        </section>
      </main>
      <StorefrontFooter />
    </div>
  );
}
