import type { NavigationItem } from "./storefront-header";

export const storefrontNavigation = [
  { label: "Kính mắt", href: "/?category=Kính%20mắt#bestsellers" },
  { label: "Kính mát", href: "/?category=Kính%20mát#bestsellers" },
  { label: "Gọng kính", href: "/?category=Gọng%20kính#bestsellers" },
  { label: "Bác sĩ", href: "/bac-si" },
  { label: "Đo mắt", href: "/#eye-exam" },
  { label: "Cửa hàng", href: "/#locations" },
] satisfies NavigationItem[];
