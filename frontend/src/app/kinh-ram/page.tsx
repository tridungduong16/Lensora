import { pageMetadata } from "@/lib/site-seo";
import { ProductCategoryPage } from "@/components/marketing/product-category-page";

export const metadata = pageMetadata({
  title: "Kính mát Vĩnh Long | PARIM, EXFASH, New Balance - Anh Thi",
  description:
    "Khám phá mẫu kính mát PARIM, EXFASH, New Balance cùng ảnh và giá tham khảo. Liên hệ Kính thuốc Anh Thi tại Vĩnh Long để hỏi mẫu và màu hiện có.",
  path: "/kinh-ram",
});

export default function KinhRamPage() {
  return (
    <ProductCategoryPage
      category="Kính mát"
      description="Xem kính mát PARIM, EXFASH và New Balance cùng ảnh, kiểu dáng và giá tham khảo. Liên hệ Kính thuốc Anh Thi tại Vĩnh Long để xác nhận mẫu và màu hiện có."
      title="Kính mát tại Vĩnh Long"
    />
  );
}
