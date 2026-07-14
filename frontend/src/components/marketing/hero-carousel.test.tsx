import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HeroCarousel } from "./hero-carousel";

test("shows the selected slide after choosing its control", async () => {
  const user = userEvent.setup();

  render(<HeroCarousel />);

  await user.click(screen.getByRole("button", { name: "Xem ảnh 2" }));

  expect(
    screen.getByRole("img", { name: /bộ sưu tập hiện đại/i }),
  ).toBeVisible();
});
