import Link from "next/link";
import { StorefrontFooter } from "./storefront-footer";
import { StorefrontHeader } from "./storefront-header";
import { storefrontNavigation } from "./storefront-navigation";
import { ProductCatalog } from "./product-catalog";
import { eyewearProducts } from "@/lib/eyewear-catalog";
import { StructuredData } from "./structured-data";
import { breadcrumbSchema } from "@/lib/local-business-schema";

type ProductCategoryPageProps = {
  category: string;
  title: string;
  description: string;
};

export function ProductCategoryPage({
  category,
  title,
  description,
}: ProductCategoryPageProps) {
  return (
    <div className="site-shell">
      <StructuredData
        data={breadcrumbSchema([
          { name: "Trang chủ", path: "/" },
          {
            name: title,
            path: category === "Kính mát" ? "/kinh-ram" : "/gong-kinh",
          },
        ])}
      />
      <StorefrontHeader navItems={storefrontNavigation} />
      <main id="main-content">
        <section
          className="page-section category-page"
          aria-labelledby="category-title"
        >
          <nav className="breadcrumbs" aria-label="Đường dẫn">
            <Link href="/">Trang chủ</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{title}</span>
          </nav>
          <div className="refresh-heading">
            <h1 id="category-title">
              {title}
              <span className="heading-period">.</span>
            </h1>
            <p>{description}</p>
          </div>
          <ProductCatalog products={eyewearProducts} fixedCategory={category} />
        </section>
      </main>
      <StorefrontFooter />
    </div>
  );
}
