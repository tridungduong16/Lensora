import type { Metadata } from "next";
import { ProductCategoryPage } from "@/components/marketing/product-category-page";

export const metadata: Metadata = {
  title: "Kính mắt | Kính thuốc Anh Thi",
  description: "Các mẫu kính mắt được khách hàng lựa chọn tại Kính thuốc Anh Thi.",
};

export default function KinhMatPage() {
  return (
    <ProductCategoryPage
      category="Kính mắt"
      description="Các mẫu kính mắt cân đối, tối giản cho môi trường làm việc và đi học."
      title="Kính mắt"
    />
  );
}
