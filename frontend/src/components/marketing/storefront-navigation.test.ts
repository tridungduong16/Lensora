import { storefrontNavigation } from "./storefront-navigation";

test("uses dedicated subpage links for the shared header navigation", () => {
  expect(storefrontNavigation).toEqual([
    { label: "Kính mắt", href: "/kinh-mat" },
    { label: "Kính mát", href: "/kinh-ram" },
    { label: "Gọng kính", href: "/gong-kinh" },
    { label: "Bác sĩ", href: "/bac-si" },
    { label: "Đo mắt", href: "/do-mat" },
    { label: "Cửa hàng", href: "/cua-hang" },
  ]);

  storefrontNavigation.forEach((item) => {
    expect(item.href).not.toContain("#");
    expect(item.href).not.toContain("?");
  });
});
