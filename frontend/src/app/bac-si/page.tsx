import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import { StorefrontFooter } from "@/components/marketing/storefront-footer";
import { StorefrontHeader } from "@/components/marketing/storefront-header";
import { storefrontNavigation } from "@/components/marketing/storefront-navigation";
import doctorAward from "../../../images/doctor-award.png";
import doctorCertificate from "../../../images/doctor-bangkhen-thaythuoc.png";
import doctorCurrentWork from "../../../images/doctor-congtac.jpg";
import doctorDanang from "../../../images/doctor-danang.jpg";
import doctorGraduation from "../../../images/doctor-graduation.jpg";
import doctorHongKong from "../../../images/doctor-hong-kong.jpg";
import doctorIndustryAnniversary from "../../../images/doctor-gioto.jpg";
import doctorNationalConference from "../../../images/doctor-national-conference-2012.jpg";
import doctorUniversity from "../../../images/doctor-university.jpg";
import styles from "./doctor-page.module.css";

export const metadata: Metadata = {
  title: "Bác sĩ Nguyễn Anh Thi | Kính thuốc Anh Thi",
  description:
    "Hồ sơ chuyên môn và hành trình hơn 30 năm chăm sóc thị lực của Bác sĩ chuyên khoa II Nguyễn Anh Thi.",
};

type TimelineItem = {
  date: string;
  title: string;
  description: string;
  image: StaticImageData;
};

const profileFacts = [
  { value: "30+", label: "năm kinh nghiệm" },
  { value: "CKII", label: "bác sĩ chuyên khoa 2" },
  { value: "Ưu tú", label: "ghi nhận nghề nghiệp" },
];

const timelineItems: TimelineItem[] = [
  {
    date: "10/03/2026",
    title: "Tham dự Giỗ tổ ngành Mắt kính lần thứ 32",
    description:
      "Tham dự sự kiện truyền thống tôn vinh nghề nghiệp và kết nối cộng đồng chuyên môn ngành mắt kính.",
    image: doctorIndustryAnniversary,
  },
  {
    date: "27/02/2026",
    title: "Bằng khen Ngày Thầy thuốc Việt Nam 2026",
    description:
      "Dấu mốc ghi nhận quá trình cống hiến trong ngành y nhân dịp Ngày Thầy thuốc Việt Nam.",
    image: doctorCertificate,
  },
  {
    date: "15/11/2025",
    title: "Hội nghị ngành Nhãn khoa Việt Nam (VIETCAN)",
    description:
      "Cập nhật kiến thức chuyên môn và trao đổi kinh nghiệm với đồng nghiệp nhãn khoa trên cả nước.",
    image: doctorDanang,
  },
  {
    date: "28/02/2025",
    title: "Nhận bằng khen của Chủ tịch UBND tỉnh Vĩnh Long",
    description:
      "Được trao bằng khen nhằm ghi nhận quá trình cống hiến trong công tác khám và chữa bệnh.",
    image: doctorAward,
  },
  {
    date: "Công tác",
    title: "Trưởng khoa Bệnh viện Mắt Vĩnh Long",
    description:
      "Hơn 30 năm gắn bó với nhãn khoa, trực tiếp thăm khám và hướng dẫn chuyên môn cho đội ngũ y bác sĩ.",
    image: doctorCurrentWork,
  },
  {
    date: "02/2018",
    title: "Hội nghị Nhãn khoa tại Hong Kong",
    description:
      "Cập nhật xu hướng chuyên môn, mở rộng kết nối học thuật và trao đổi kinh nghiệm quốc tế.",
    image: doctorHongKong,
  },
  {
    date: "01/06/2014",
    title: "Nhận bằng Bác sĩ chuyên khoa 2 — Đại học Y Dược TP.HCM",
    description:
      "Hoàn thành chương trình đào tạo chuyên sâu và nhận bằng Bác sĩ chuyên khoa 2.",
    image: doctorGraduation,
  },
  {
    date: "20/10/2012",
    title: "Tham dự Hội nghị Nhãn khoa Toàn quốc",
    description:
      "Cập nhật kiến thức, trao đổi kinh nghiệm và kết nối chuyên môn với đồng nghiệp trong cả nước.",
    image: doctorNationalConference,
  },
  {
    date: "1989–1995",
    title: "Tốt nghiệp Bác sĩ đa khoa YK15 — Đại học Y Dược Cần Thơ",
    description:
      "Nền tảng y khoa tổng quát giúp xây dựng tư duy lâm sàng toàn diện cho hành trình chuyên khoa sau này.",
    image: doctorUniversity,
  },
];

export default function DoctorPage() {
  return (
    <div className="site-shell">
      <StorefrontHeader navItems={storefrontNavigation} />

      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="doctor-title">
          <div className={styles.heroCopy}>
            <h1 id="doctor-title">Bác sĩ Nguyễn Anh Thi</h1>
            <p className={styles.heroSummary}>
              Bác sĩ chuyên khoa 2, Trưởng khoa Bệnh viện Mắt Vĩnh Long với hơn
              30 năm kinh nghiệm thăm khám, tư vấn và chăm sóc sức khỏe mắt.
            </p>
            <div className={styles.heroActions} aria-label="Liên kết hồ sơ bác sĩ">
              <Link className={styles.primaryAction} href="/#eye-exam">
                Đặt lịch khám
              </Link>
              <Link className={styles.secondaryAction} href="#hanh-trinh">
                Xem hành trình
              </Link>
            </div>
          </div>

          <Image
            alt="Bác sĩ Nguyễn Anh Thi"
            className={styles.heroImage}
            priority
            sizes="(min-width: 900px) 42vw, 100vw"
            src={doctorCurrentWork}
          />

          <div className={styles.proofStrip} aria-label="Thông tin chuyên môn nổi bật">
            {profileFacts.map((fact) => (
              <div className={styles.proofItem} key={fact.label}>
                <strong>{fact.value}</strong>
                <span>{fact.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section
          className={styles.timelineSection}
          id="hanh-trinh"
          aria-labelledby="timeline-title"
        >
          <div className={styles.timelineHeading}>
            <h2 id="timeline-title">
              Hành trình chuyên môn của bác sĩ Nguyễn Anh Thi
            </h2>
            <p>
              Từ nền tảng y khoa tổng quát đến chuyên khoa nhãn khoa, mỗi giai
              đoạn đều góp phần xây dựng năng lực thăm khám và tư vấn cho bệnh nhân.
            </p>
          </div>

          <ol className={styles.timelineList}>
            {timelineItems.map((item) => (
              <li className={styles.timelineItem} key={`${item.date}-${item.title}`}>
                <article className={styles.timelineArticle}>
                  <Image
                    alt={item.title}
                    className={styles.timelineImage}
                    sizes="(min-width: 900px) 38vw, 100vw"
                    src={item.image}
                  />
                  <div className={styles.timelineContent}>
                    <time className={styles.timelineDate}>{item.date}</time>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <StorefrontFooter />
    </div>
  );
}
