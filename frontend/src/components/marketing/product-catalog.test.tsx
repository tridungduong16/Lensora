import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductCatalog } from "./product-catalog";
import { eyewearProducts } from "@/lib/eyewear-catalog";

test("combines brand, budget and search and recovers from an empty result", async () => {
  const user = userEvent.setup();
  render(<ProductCatalog products={eyewearProducts} />);
  await user.click(screen.getByRole("button", { name: /^EXFASH$/ }));
  expect(screen.getByRole("status")).toHaveTextContent("4 mẫu kính EXFASH");
  await user.selectOptions(screen.getByLabelText("Ngân sách"), "1000000");
  expect(screen.getByRole("status")).toHaveTextContent("3 mẫu kính EXFASH");
  await user.type(screen.getByRole("searchbox"), "does-not-exist");
  expect(
    screen.getByRole("heading", { name: "Chưa tìm thấy mẫu phù hợp" }),
  ).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Xem tất cả mẫu kính" }));
  expect(screen.getByRole("status")).toHaveTextContent("12 mẫu kính");
});

test("sorts prices numerically and keeps fixed category results", async () => {
  const user = userEvent.setup();
  render(
    <ProductCatalog products={eyewearProducts} fixedCategory="Kính mát" />,
  );
  expect(screen.getByRole("status")).toHaveTextContent("3 mẫu kính");
  await user.selectOptions(screen.getByLabelText("Sắp xếp"), "price-asc");
  const cards = screen.getAllByRole("article");
  expect(within(cards[0]).getByRole("heading")).toHaveTextContent("EF292011");
  expect(within(cards[2]).getByRole("heading")).toHaveTextContent("NB08139X");
  await user.type(screen.getByRole("searchbox"), "mat meo");
  expect(screen.getByRole("status")).toHaveTextContent("1 mẫu kính");
  expect(
    screen.getByRole("link", { name: "Xem PARIM 84043" }),
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
