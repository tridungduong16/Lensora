import { pageMetadata } from "@/lib/site-seo";
import { LensPricingPage } from "@/components/marketing/lens-pricing-page";

export const metadata = pageMetadata({
  title: "Bảng giá tròng kính Vĩnh Long | Kính thuốc Anh Thi",
  description:
    "Tham khảo bảng giá tròng kính theo cặp: tròng đổi màu, EXFASH, hai tròng, đa tròng và loạn đơn tại Kính thuốc Anh Thi, Vĩnh Long.",
  path: "/bang-gia",
});

export default function PricingIndexPage() {
  return <LensPricingPage />;
}
