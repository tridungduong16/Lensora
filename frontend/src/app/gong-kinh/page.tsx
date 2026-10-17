import { pageMetadata } from "@/lib/site-seo";
import { ProductCategoryPage } from "@/components/marketing/product-category-page";

export const metadata = pageMetadata({
  title: "Gọng kính Vĩnh Long: PARIM, EXFASH, New Balance | Anh Thi",
  description:
    "Xem gọng kính PARIM, EXFASH, New Balance với ảnh, chất liệu và giá tham khảo. Gọi Anh Thi tại Vĩnh Long để xác nhận mẫu, màu và lịch thử kính.",
  path: "/gong-kinh",
});

export default function GongKinhPage() {
  return (
    <ProductCategoryPage
      category="Gọng kính"
      description="Khám phá gọng PARIM, EXFASH và New Balance cùng ảnh, chất liệu và giá tham khảo. Liên hệ Anh Thi tại 85 Phạm Thái Bường, Vĩnh Long để hỏi mẫu và thử gọng trực tiếp."
      title="Gọng kính tại Vĩnh Long"
    />
  );
}
