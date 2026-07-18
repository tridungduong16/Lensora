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
  dateTime?: string;
  title: string;
  description: string;
  image: StaticImageData;
};

const profileFacts = [
  { value: "30+", label: "năm kinh nghiệm thăm khám và chăm sóc thị lực" },
  { value: "CKII", label: "bác sĩ chuyên khoa 2 với nền tảng đào tạo chuyên sâu" },
  { value: "Ưu tú", label: "ghi nhận nghề nghiệp qua danh hiệu Thầy thuốc ưu tú" },
];

const timelineItems: TimelineItem[] = [
  {
    date: "10/03/2026",
    dateTime: "2026-03-10",
    title: "Tham dự Giỗ tổ ngành Mắt kính lần thứ 32",
    description:
      "Ngày 10/3/2026, tham dự Giỗ tổ ngành Mắt kính lần thứ 32, một sự kiện truyền thống nhằm tôn vinh nghề nghiệp và kết nối cộng đồng chuyên môn.",
    image: doctorIndustryAnniversary,
  },
  {
    date: "27/02/2026",
    dateTime: "2026-02-27",
    title: "Bằng khen Ngày Thầy thuốc Việt Nam 2026",
    description:
      "Dấu mốc ghi nhận thêm cho quá trình cống hiến trong ngành y, nhân dịp Ngày Thầy thuốc Việt Nam năm 2026.",
    image: doctorCertificate,
  },
  {
    date: "15/11/2025",
    dateTime: "2025-11-15",
    title: "Hội nghị ngành Nhãn khoa Việt Nam (VIETCAN) tại Đà Nẵng",
    description:
      "Tham dự Hội nghị ngành Nhãn khoa Việt Nam tại Đà Nẵng, cập nhật kiến thức chuyên môn và trao đổi kinh nghiệm với đồng nghiệp trên cả nước.",
    image: doctorDanang,
  },
  {
    date: "28/02/2025",
    dateTime: "2025-02-28",
    title: "Nhận bằng khen của Chủ tịch UBND tỉnh Vĩnh Long",
    description:
      "Ngày 28/02/2025, vinh dự được trao bằng khen của Chủ tịch UBND tỉnh Vĩnh Long nhằm ghi nhận quá trình cống hiến trong công tác khám chữa bệnh.",
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
    dateTime: "2018-02",
    title: "Hội nghị Nhãn khoa tại Hong Kong",
    description:
      "Tham dự hội nghị nhãn khoa tại Hong Kong vào tháng 02/2018 để cập nhật xu hướng chuyên môn, mở rộng kết nối học thuật và trao đổi kinh nghiệm quốc tế.",
    image: doctorHongKong,
  },
  {
    date: "01/06/2014",
    dateTime: "2014-06-01",
    title: "Nhận bằng Bác sĩ chuyên khoa 2: Đại học Y Dược TP.HCM",
    description:
      "Ngày 01/06/2014, hoàn thành chương trình đào tạo chuyên sâu và nhận bằng Bác sĩ chuyên khoa 2 tại Đại học Y Dược TP.HCM.",
    image: doctorGraduation,
  },
  {
    date: "20/10/2012",
    dateTime: "2012-10-20",
    title: "Tham dự Hội nghị Nhãn khoa Toàn quốc",
    description:
      "Tham dự hội nghị chuyên ngành nhãn khoa toàn quốc để cập nhật kiến thức, trao đổi kinh nghiệm và kết nối chuyên môn với đồng nghiệp trong cả nước.",
    image: doctorNationalConference,
  },
  {
    date: "1989-1995",
    title: "Tốt nghiệp Bác sĩ đa khoa YK15: Đại học Y Dược Cần Thơ",
    description:
      "Niên khóa 1989 - 1995, lớp YK15. Nền tảng y khoa tổng quát, xây dựng tư duy lâm sàng toàn diện.",
    image: doctorUniversity,
  },
];

export default function DoctorPage() {
  return (
    <div className="site-shell">
      <StorefrontHeader navItems={storefrontNavigation} />

      <main className={styles.main} id="main-content">
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
                    {item.dateTime ? (
                      <time className={styles.timelineDate} dateTime={item.dateTime}>
                        {item.date}
                      </time>
                    ) : (
                      <span className={styles.timelineDate}>{item.date}</span>
                    )}
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
