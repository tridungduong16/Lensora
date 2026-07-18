import type { Metadata } from "next";
import { EyeExamPage } from "@/components/marketing/eye-exam-page";

export const metadata: Metadata = {
  title: "Đo mắt | Kính thuốc Anh Thi",
  description: "Đặt lịch đo mắt và nhận tư vấn kính thuốc tại Kính thuốc Anh Thi.",
};

export default function DoMatPage() {
  return <EyeExamPage />;
}
