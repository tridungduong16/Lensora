import type { Metadata } from "next";
import { StoreLocationsPage } from "@/components/marketing/store-locations-page";

export const metadata: Metadata = {
  title: "Cửa hàng | Kính thuốc Anh Thi",
  description: "Thông tin cửa hàng Kính thuốc Anh Thi tại Vĩnh Long.",
};

export default function CuaHangPage() {
  return <StoreLocationsPage />;
}
