import { render, screen, within } from "@testing-library/react";
import Home from "./page";

async function renderHome(
  search: { category?: string; query?: string; brand?: string } = {},
) {
  return render(await Home({ searchParams: Promise.resolve(search) }));
}

test("uses the advertising video and preserves service links and information", async () => {
  const { container } = await renderHome();
  const hero = screen
    .getByRole("heading", {
      level: 1,
      name: "Chọn kính phù hợp. An tâm cho đôi mắt.",
    })
    .closest("section")!;
  expect(
    within(hero).getByRole("link", { name: "Đặt lịch đo mắt" }),
  ).toHaveAttribute("href", "/#eye-exam");
  expect(
    within(hero).getByRole("link", { name: /Xem mẫu kính/ }),
  ).toHaveAttribute("href", "/#bestsellers");
  expect(screen.getByLabelText("Dịch vụ tại Anh Thi")).toHaveTextContent(
    "85 Phạm Thái Bường",
  );
  expect(screen.queryByText("★★★★★ 4.9")).not.toBeInTheDocument();
  expect(container.querySelector("video")).toHaveAttribute(
    "src",
    "/videos/gioi_thieu_kinh_thuoc_anh_thi_ngang_1920x1080.mp4",
  );
});

test("presents the supplied store photographs and current collections", async () => {
  await renderHome();
  expect(screen.getByRole("status")).toHaveTextContent("13 mẫu kính");
  expect(screen.getByRole("link", { name: "Xem BOLON Gọng vuông đen và đồi mồi" })).toHaveAttribute(
    "href",
    "/san-pham/bolon-gong-vuong",
  );
  expect(
    screen.getByRole("link", { name: "Xem EXFASH EF45402" }),
  ).toHaveAttribute("href", "/san-pham/exfash-ef45402");
  expect(
    screen.getByRole("link", { name: "Xem New Balance Gọng kim loại bo vuông" }),
  ).toHaveAttribute("href", "/san-pham/new-balance-gong-kim-loai");
  expect(
    screen.getByText(/Ảnh chụp kính tại Anh Thi/),
  ).toBeInTheDocument();
});

test("opens the intended brand and search from an incoming link", async () => {
  await renderHome({ brand: "EXFASH", query: "45402" });
  expect(screen.getByRole("status")).toHaveTextContent("1 mẫu kính EXFASH");
  expect(
    screen.getByRole("link", { name: "Xem EXFASH EF45402" }),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("link", { name: "Xem BOLON Gọng vuông đen và đồi mồi" }),
  ).not.toBeInTheDocument();
});

test("keeps price-list links hidden on the homepage", async () => {
  const { container } = await renderHome();
  expect(
    container.querySelector('a[href="/bang-gia"]'),
  ).not.toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: "Bác sĩ" })[0]).toHaveAttribute(
    "href",
    "/bac-si",
  );
});

test("preserves the confirmed contact details and appointment fallback", async () => {
  await renderHome();
  const footer = screen.getByRole("contentinfo");
  expect(
    within(footer).getByRole("link", { name: "+84 85 806 0789" }),
  ).toHaveAttribute("href", "tel:+84858060789");
  expect(
    within(footer).getByRole("link", {
      name: "85 Phạm Thái Bường Phường 4, Vinh Long, Vietnam, 85000",
    }),
  ).toHaveAttribute("href", expect.stringContaining("10.241584976617"));
  expect(
    screen.getByRole("link", { name: "Gọi +84 85 806 0789" }),
  ).toBeInTheDocument();
});

test("offers practical fitting guidance without invented reviews", async () => {
  const { container } = await renderHome();
  expect(
    screen.getByText("Giá trên website đã gồm tròng kính chưa?"),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "Gặp gỡ bác sĩ Anh Thi" }),
  ).toHaveAttribute("href", "/bac-si");
  expect(screen.queryByLabelText("5 trên 5 sao")).not.toBeInTheDocument();
  expect(container.textContent).not.toMatch(/[\u2014\u2013]/);
});
