import type { Metadata } from "next";
import { ProductCategoryPage } from "@/components/marketing/product-category-page";

export const metadata: Metadata = {
  title: "Gọng kính | Kính thuốc Anh Thi",
  description: "Các mẫu gọng kính nhẹ, bền và dễ sử dụng hằng ngày.",
};

export default function GongKinhPage() {
  return (
    <ProductCategoryPage
      category="Gọng kính"
      description="Gọng kính nhẹ, bền và dễ phối với nhu cầu nhìn rõ trong cả ngày dài."
      title="Gọng kính"
    />
  );
}
