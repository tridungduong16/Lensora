import { render, screen } from "@testing-library/react";
import Home from "./page";

test("links the storefront navigation to the doctor page", async () => {
  render(await Home({ searchParams: Promise.resolve({}) }));

  expect(screen.getAllByRole("link", { name: "Bác sĩ" })).not.toHaveLength(0);
  expect(screen.getAllByRole("link", { name: "Bác sĩ" })[0]).toHaveAttribute(
    "href",
    "/bac-si",
  );
});
