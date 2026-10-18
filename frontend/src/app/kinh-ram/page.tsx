import { pageMetadata } from "@/lib/site-seo";
import { ProductCategoryPage } from "@/components/marketing/product-category-page";

export const metadata = pageMetadata({
  title: "Kính mát Vĩnh Long | Kính thuốc Anh Thi",
  description:
    "Liên hệ Kính thuốc Anh Thi tại Vĩnh Long để được tư vấn kính mát, hỏi mẫu, màu và giá hiện có. Ghé 85 Phạm Thái Bường để thử kính trực tiếp.",
  path: "/kinh-ram",
});

export default function KinhRamPage() {
  return (
    <ProductCategoryPage
      category="Kính mát"
      description="Bộ ảnh hiện tại gồm gọng kính thuốc. Liên hệ Kính thuốc Anh Thi tại Vĩnh Long để hỏi các mẫu kính mát, màu và giá hiện có hoặc ghé cửa hàng để được tư vấn."
      title="Kính mát tại Vĩnh Long"
    />
  );
}
