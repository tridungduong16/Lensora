import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { lensPriceCategories } from "@/components/marketing/lens-pricing-data";
import { LensPricingPage } from "@/components/marketing/lens-pricing-page";

type PricingCategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return lensPriceCategories.map((category) => ({ category: category.id }));
}

export async function generateMetadata({ params }: PricingCategoryPageProps): Promise<Metadata> {
  const { category: categoryId } = await params;
  const category = lensPriceCategories.find((item) => item.id === categoryId);
  if (!category) notFound();

  return {
    title: `${category.heading ?? `Bảng giá ${category.title.toLowerCase()}`} | Kính thuốc Anh Thi`,
    description: `${category.description} Tham khảo giá theo cặp tại Kính thuốc Anh Thi.`,
  };
}

export default async function PricingCategoryPage({ params }: PricingCategoryPageProps) {
  const { category: categoryId } = await params;
  const category = lensPriceCategories.find((item) => item.id === categoryId);
  if (!category) notFound();

  return <LensPricingPage category={category} />;
}
