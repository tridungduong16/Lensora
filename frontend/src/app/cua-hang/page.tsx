import { pageMetadata } from "@/lib/site-seo";
import { StoreLocationsPage } from "@/components/marketing/store-locations-page";

export const metadata = pageMetadata({
  title: "Cửa hàng kính thuốc Vĩnh Long | Kính thuốc Anh Thi",
  description:
    "Địa chỉ Kính thuốc Anh Thi: 85 Phạm Thái Bường, Phường 4, Vĩnh Long. Mở cửa 09:00 - 20:30 mỗi ngày. Gọi 085 806 0789 để hỏi mẫu kính và lịch đo mắt.",
  path: "/cua-hang",
});

export default function CuaHangPage() {
  return <StoreLocationsPage />;
}
