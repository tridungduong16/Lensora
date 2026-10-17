import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { lensPriceCategories } from "@/components/marketing/lens-pricing-data";
import { LensPricingPage } from "@/components/marketing/lens-pricing-page";
import { pageMetadata } from "@/lib/site-seo";

export const dynamicParams = false;

type PricingCategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return lensPriceCategories.map((category) => ({ category: category.id }));
}

export async function generateMetadata({
  params,
}: PricingCategoryPageProps): Promise<Metadata> {
  const { category: categoryId } = await params;
  const category = lensPriceCategories.find((item) => item.id === categoryId);
  if (!category) notFound();

  return pageMetadata({
    title: `${category.heading ?? `Bảng giá ${category.title.toLowerCase()}`} | Anh Thi Vĩnh Long`,
    description: `${category.description} Tham khảo giá theo cặp tại Kính thuốc Anh Thi, Vĩnh Long.`,
    path: `/bang-gia/${category.id}`,
  });
}

export default async function PricingCategoryPage({
  params,
}: PricingCategoryPageProps) {
  const { category: categoryId } = await params;
  const category = lensPriceCategories.find((item) => item.id === categoryId);
  if (!category) notFound();

  return <LensPricingPage category={category} />;
}
