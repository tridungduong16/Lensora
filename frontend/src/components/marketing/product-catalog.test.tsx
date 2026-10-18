import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductCatalog } from "./product-catalog";
import { eyewearProducts } from "@/lib/eyewear-catalog";

test("combines brand, budget and search and recovers from an empty result", async () => {
  const user = userEvent.setup();
  render(<ProductCatalog products={eyewearProducts} />);
  await user.click(screen.getByRole("button", { name: /^EXFASH$/ }));
  expect(screen.getByRole("status")).toHaveTextContent("3 mẫu kính EXFASH");
  await user.selectOptions(screen.getByLabelText("Ngân sách"), "1000000");
  expect(screen.getByRole("status")).toHaveTextContent("1 mẫu kính EXFASH");
  await user.type(screen.getByRole("searchbox"), "does-not-exist");
  expect(
    screen.getByRole("heading", { name: "Chưa tìm thấy mẫu phù hợp" }),
  ).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Xem tất cả mẫu kính" }));
  expect(screen.getByRole("status")).toHaveTextContent("13 mẫu kính");
});

test("sorts prices numerically and keeps fixed category results", async () => {
  const user = userEvent.setup();
  render(
    <ProductCatalog products={eyewearProducts} fixedCategory="Gọng kính" />,
  );
  expect(screen.getByRole("status")).toHaveTextContent("13 mẫu kính");
  await user.selectOptions(screen.getByLabelText("Sắp xếp"), "price-asc");
  const cards = screen.getAllByRole("article");
  expect(within(cards[0]).getByRole("heading")).toHaveTextContent("Gọng trong xanh và hồng");
  expect(within(cards[2]).getByRole("heading")).toHaveTextContent("EF45402");
  expect(within(cards.at(-1)!).getByText("Liên hệ")).toBeInTheDocument();
  await user.selectOptions(screen.getByLabelText("Sắp xếp"), "price-desc");
  expect(within(screen.getAllByRole("article")[0]).getByRole("heading")).toHaveTextContent("Gọng vuông đen và đồi mồi");
  expect(within(screen.getAllByRole("article").at(-1)!).getByText("Liên hệ")).toBeInTheDocument();
  await user.type(screen.getByRole("searchbox"), "mat meo");
  expect(screen.getByRole("status")).toHaveTextContent("1 mẫu kính");
  expect(
    screen.getByRole("link", { name: "Xem Stance Gọng trong và chuyển màu" }),
  ).toBeInTheDocument();
});

test("opens mobile options and returns focus to the toggle after applying", async () => {
  const user = userEvent.setup();
  render(<ProductCatalog products={eyewearProducts} />);
  const toggle = screen.getByRole("button", { name: "Bộ lọc và sắp xếp" });
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  await user.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "true");
  await user.selectOptions(screen.getByLabelText("Ngân sách"), "1000000");
  await user.click(screen.getByRole("button", { name: "Xem 3 mẫu kính" }));
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  expect(toggle).toHaveFocus();
  expect(screen.getByRole("status")).toHaveTextContent("3 mẫu kính");
});

test("keeps applied options visible and removes one without clearing the others", async () => {
  const user = userEvent.setup();
  render(<ProductCatalog products={eyewearProducts} />);
  await user.click(screen.getByRole("button", { name: /^EXFASH$/ }));
  await user.click(screen.getByRole("button", { name: "Bộ lọc và sắp xếp" }));
  await user.selectOptions(screen.getByLabelText("Loại kính"), "Gọng kính");
  await user.selectOptions(screen.getByLabelText("Ngân sách"), "1000000");
  await user.selectOptions(screen.getByLabelText("Sắp xếp"), "price-desc");
  await user.click(screen.getByRole("button", { name: "Xem 1 mẫu kính" }));

  const applied = screen.getByRole("group", { name: "Bộ lọc đang áp dụng" });
  expect(within(applied).getAllByRole("button")).toHaveLength(3);
  await user.click(
    within(applied).getByRole("button", { name: "Bỏ lựa chọn: Đến 1.000.000 ₫" }),
  );

  expect(screen.getByLabelText("Ngân sách")).toHaveValue("");
  expect(screen.getByLabelText("Loại kính")).toHaveValue("Gọng kính");
  expect(screen.getByLabelText("Sắp xếp")).toHaveValue("price-desc");
  expect(screen.getByRole("status")).toHaveTextContent("3 mẫu kính EXFASH");
  expect(screen.getByRole("status")).toHaveFocus();
  expect(within(applied).getAllByRole("button")).toHaveLength(2);
});

test("allows resetting a sort-only selection", async () => {
  const user = userEvent.setup();
  render(<ProductCatalog products={eyewearProducts} fixedCategory="Gọng kính" />);
  await user.selectOptions(screen.getByLabelText("Sắp xếp"), "price-desc");
  await user.click(screen.getByRole("button", { name: "Xóa bộ lọc" }));

  expect(screen.getByLabelText("Sắp xếp")).toHaveValue("featured");
  expect(screen.queryByRole("group", { name: "Bộ lọc đang áp dụng" })).toBeNull();
  expect(screen.getByRole("status")).toHaveTextContent("13 mẫu kính");
  expect(screen.getByRole("status")).toHaveFocus();
});
