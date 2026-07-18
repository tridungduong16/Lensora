import { render, screen, within } from "@testing-library/react";
import Home from "./page";

test("links the storefront navigation to the doctor page", async () => {
  render(await Home({ searchParams: Promise.resolve({}) }));

  expect(screen.getAllByRole("link", { name: "Bác sĩ" })).not.toHaveLength(0);
  expect(screen.getAllByRole("link", { name: "Bác sĩ" })[0]).toHaveAttribute(
    "href",
    "/bac-si",
  );
});

test("renders the editorial home hero and trust proof", async () => {
  const { container } = render(await Home({ searchParams: Promise.resolve({}) }));

  const heroHeading = screen.getByRole("heading", {
    level: 1,
    name: "Nhìn rõ hơn.",
  });
  const hero = heroHeading.closest("section");

  expect(hero).not.toBeNull();
  expect(
    screen.getByText("Đo mắt chuẩn y khoa với hơn 20 năm kinh nghiệm."),
  ).toBeInTheDocument();
  expect(within(hero!).getByRole("link", { name: "Đặt lịch đo mắt" })).toHaveAttribute(
    "href",
    "/#eye-exam",
  );
  expect(within(hero!).getByRole("link", { name: /Xem bộ sưu tập/i })).toHaveAttribute(
    "href",
    "/#collections",
  );
  expect(screen.getByText("★★★★★ 4.9")).toBeInTheDocument();
  expect(screen.getByText("10.000+ khách hàng")).toBeInTheDocument();
  expect(screen.getByText("20 năm kinh nghiệm")).toBeInTheDocument();
  expect(screen.getByText("100+ thương hiệu")).toBeInTheDocument();
  expect(container.querySelector("video")).not.toBeInTheDocument();
});

test("connects the editorial sections to existing customer journeys", async () => {
  render(await Home({ searchParams: Promise.resolve({}) }));

  expect(
    screen.getByRole("heading", { level: 2, name: "Bộ sưu tập nổi bật" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { level: 2, name: "Sản phẩm được yêu thích" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { level: 2, name: "Đo mắt kỹ. Chọn kính đúng." }),
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Gặp gỡ bác sĩ Anh Thi" })).toHaveAttribute(
    "href",
    "/bac-si",
  );
  expect(
    screen.getByRole("heading", { level: 2, name: "Đặt lịch đo mắt" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { level: 2, name: "Khách hàng nói gì" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { level: 2, name: "Ghé Anh Thi" }),
  ).toBeInTheDocument();
});

test("keeps useful navigation and contact details in the footer", async () => {
  render(await Home({ searchParams: Promise.resolve({}) }));

  const footer = screen.getByRole("contentinfo");
  expect(within(footer).getByRole("link", { name: "Bác sĩ" })).toHaveAttribute(
    "href",
    "/bac-si",
  );
  expect(
    within(footer).getByRole("link", { name: "0908 123 456" }),
  ).toHaveAttribute("href", "tel:0908123456");
});

test("makes every product consultation destination visible", async () => {
  render(await Home({ searchParams: Promise.resolve({}) }));

  const consultationLinks = screen.getAllByRole("link", {
    name: "Tư vấn tại cửa hàng",
  });
  expect(consultationLinks).toHaveLength(4);
  consultationLinks.forEach((link) => {
    expect(link).toHaveAttribute("href", "/#locations");
  });
});

test("uses one review rating treatment and no long dash characters", async () => {
  const { container } = render(
    await Home({ searchParams: Promise.resolve({}) }),
  );

  expect(screen.getAllByLabelText("5 trên 5 sao")).toHaveLength(1);
  expect(container.textContent).not.toMatch(/[\u2014\u2013]/);
});
