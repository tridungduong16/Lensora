import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import ProductPage, { generateMetadata, generateStaticParams } from "./page";

vi.mock("next/navigation", () => ({
  usePathname: () => "/san-pham/bolon-gong-vuong",
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

test("renders supplied photography, sticker price context and direct store contact", async () => {
  render(
    await ProductPage({ params: Promise.resolve({ slug: "bolon-gong-vuong" }) }),
  );
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Gọng vuông đen và đồi mồi");
  expect(
    screen.getByText(/Giá trên tem ảnh \/ gọng, chưa gồm tròng thuốc/),
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Ảnh tại Kính thuốc Anh Thi" })).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: "Mắt Kính Tâm Đức" })).not.toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "Gọi tư vấn mẫu này" }),
  ).toHaveAttribute("href", "tel:+84858060789");
  expect(generateStaticParams()).toHaveLength(13);
  expect(screen.getByRole("button", { name: "Thử kính bằng camera" })).toBeInTheDocument();
});

test("does not present a fabricated model when its URL is unknown", async () => {
  await expect(
    ProductPage({ params: Promise.resolve({ slug: "missing-model" }) }),
  ).rejects.toThrow("NEXT_NOT_FOUND");
  expect(
    await generateMetadata({
      params: Promise.resolve({ slug: "exfash-ef45402" }),
    }),
  ).toMatchObject({ title: "EXFASH EF45402 | Kính thuốc Anh Thi Vĩnh Long" });
});
