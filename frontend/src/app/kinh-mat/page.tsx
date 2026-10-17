import { pageMetadata } from "@/lib/site-seo";
import { ProductCategoryPage } from "@/components/marketing/product-category-page";

export const metadata = pageMetadata({
  title: "Kính thuốc Vĩnh Long: chọn gọng và tròng kính | Anh Thi",
  description:
    "Khám phá gọng kính thuốc, tìm hiểu tròng kính và đặt lịch đo mắt tại Anh Thi, Vĩnh Long. Tư vấn trực tiếp tại 85 Phạm Thái Bường, Phường 4.",
  path: "/gong-kinh",
});

export default function KinhMatPage() {
  return (
    <ProductCategoryPage
      category="Kính mắt"
      description="Chọn gọng cho nhu cầu học tập và làm việc tại Anh Thi, Vĩnh Long. Tròng kính thuốc được tư vấn riêng; giá gọng tham khảo chưa bao gồm tròng kính."
      title="Kính thuốc tại Vĩnh Long"
    />
  );
}
