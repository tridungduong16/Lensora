import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import ProductPage, { generateMetadata, generateStaticParams } from "./page";

vi.mock("next/navigation", () => ({
  usePathname: () => "/san-pham/parim-85006",
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

test("renders the model, source price context and direct store contact", async () => {
  render(
    await ProductPage({ params: Promise.resolve({ slug: "parim-85006" }) }),
  );
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("85006");
  expect(
    screen.getByText(/Giá tham khảo \/ gọng, chưa gồm tròng thuốc/),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "Mắt Kính Tâm Đức" }),
  ).toHaveAttribute("href", "https://matkinhtamduc.com/gong-kinh-parim-85006/");
  expect(
    screen.getByRole("link", { name: "Gọi tư vấn mẫu này" }),
  ).toHaveAttribute("href", "tel:+84858060789");
  expect(generateStaticParams()).toHaveLength(12);
});

test("does not present a fabricated model when its URL is unknown", async () => {
  await expect(
    ProductPage({ params: Promise.resolve({ slug: "missing-model" }) }),
  ).rejects.toThrow("NEXT_NOT_FOUND");
  expect(
    await generateMetadata({
      params: Promise.resolve({ slug: "exfash-ef69473" }),
    }),
  ).toMatchObject({ title: "EXFASH EF69473 | Kính thuốc Anh Thi Vĩnh Long" });
});
