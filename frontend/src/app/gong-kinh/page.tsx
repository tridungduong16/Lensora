import { pageMetadata } from "@/lib/site-seo";
import { ProductCategoryPage } from "@/components/marketing/product-category-page";

export const metadata = pageMetadata({
  title: "Gọng kính Vĩnh Long: BOLON, EXFASH, New Balance | Anh Thi",
  description:
    "Xem ảnh gọng kính BOLON, EXFASH, New Balance và nhiều thương hiệu chụp tại Anh Thi. Gọi cửa hàng tại Vĩnh Long để hỏi mẫu, màu, giá và lịch thử kính.",
  path: "/gong-kinh",
});

export default function GongKinhPage() {
  return (
    <ProductCategoryPage
      category="Gọng kính"
      description="Xem bộ ảnh gọng BOLON, EXFASH, New Balance và nhiều thương hiệu chụp tại Anh Thi. Liên hệ cửa hàng tại 85 Phạm Thái Bường, Vĩnh Long để hỏi mẫu và thử gọng trực tiếp."
      title="Gọng kính tại Vĩnh Long"
    />
  );
}
