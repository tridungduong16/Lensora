import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductGallery } from "./product-gallery";
import { eyewearProducts } from "@/lib/eyewear-catalog";

test("lets visitors inspect both photographs with keyboard-accessible controls", async () => {
  const user = userEvent.setup();
  const product = eyewearProducts[0];
  render(<ProductGallery images={product.images} name={product.name} />);
  expect(
    screen.getByRole("img", { name: product.images[0].alt }),
  ).toHaveAttribute("src", product.images[0].src);
  const second = screen.getByRole("button", {
    name: `Xem góc ảnh 2 của ${product.name}`,
  });
  await user.click(second);
  expect(second).toHaveAttribute("aria-pressed", "true");
  expect(
    screen.getByRole("img", { name: product.images[1].alt }),
  ).toHaveAttribute("src", product.images[1].src);
});
