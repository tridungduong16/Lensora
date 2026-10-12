import type { Metadata } from "next";
import { LensPricingPage } from "@/components/marketing/lens-pricing-page";

export const metadata: Metadata = {
  title: "Bảng giá tròng kính | Kính thuốc Anh Thi",
  description:
    "Chọn bảng giá tròng đổi màu, EXFASH, kính hai tròng, đa tròng và loạn đơn tại Kính thuốc Anh Thi. Giá tính theo cặp.",
};

export default function PricingIndexPage() {
  return <LensPricingPage />;
}
