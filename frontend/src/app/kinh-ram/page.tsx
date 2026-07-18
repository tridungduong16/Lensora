import type { Metadata } from "next";
import { ProductCategoryPage } from "@/components/marketing/product-category-page";

export const metadata: Metadata = {
  title: "Kính mát | Kính thuốc Anh Thi",
  description: "Các mẫu kính mát bảo vệ mắt trước cường độ nắng cao.",
};

export default function KinhRamPage() {
  return (
    <ProductCategoryPage
      category="Kính mát"
      description="Kính mát đa nhiệm, giúp bảo vệ mắt trước cường độ nắng cao."
      title="Kính mát"
    />
  );
}
