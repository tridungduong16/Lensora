import { pageMetadata } from "@/lib/site-seo";
import { EyeExamPage } from "@/components/marketing/eye-exam-page";

export const metadata = pageMetadata({
  title: "Đo mắt Vĩnh Long | Tư vấn kính thuốc Anh Thi",
  description:
    "Đo mắt và tư vấn kính thuốc tại 85 Phạm Thái Bường, Vĩnh Long. Tìm hiểu quy trình, chuẩn bị lịch hẹn và thông tin khi cần khám mắt chuyên khoa.",
  path: "/do-mat",
});

export default function DoMatPage() {
  return <EyeExamPage />;
}
