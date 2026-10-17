import { render, screen, within } from "@testing-library/react";
import Home from "./page";

async function renderHome(
  search: { category?: string; query?: string; brand?: string } = {},
) {
  return render(await Home({ searchParams: Promise.resolve(search) }));
}

test("preserves the hero and real service information", async () => {
  const { container } = await renderHome();
  const hero = screen
    .getByRole("heading", {
      level: 1,
      name: "Kính thuốc Anh Thi tại Vĩnh Long",
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
  expect(container.querySelector("video")).not.toBeInTheDocument();
});

test("provides real product details for all three requested brands", async () => {
  await renderHome();
  expect(screen.getByRole("status")).toHaveTextContent("12 mẫu kính");
  expect(screen.getByRole("link", { name: "Xem PARIM 85006" })).toHaveAttribute(
    "href",
    "/san-pham/parim-85006",
  );
  expect(
    screen.getByRole("link", { name: "Xem EXFASH EF69473" }),
  ).toHaveAttribute("href", "/san-pham/exfash-ef69473");
  expect(
    screen.getByRole("link", { name: "Xem New Balance NB09332" }),
  ).toHaveAttribute("href", "/san-pham/new-balance-nb09332");
  expect(
    screen.getByText(/Giá và ảnh tham khảo từ các nhà bán lẻ/),
  ).toBeInTheDocument();
});

test("opens the intended brand and search from an incoming link", async () => {
  await renderHome({ brand: "EXFASH", query: "ultem" });
  expect(screen.getByRole("status")).toHaveTextContent("1 mẫu kính EXFASH");
  expect(
    screen.getByRole("link", { name: "Xem EXFASH EF69473" }),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("link", { name: "Xem PARIM 85006" }),
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
