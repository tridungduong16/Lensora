import { StorefrontFooter } from "@/components/marketing/storefront-footer";
import { StorefrontHeader } from "@/components/marketing/storefront-header";
import { storefrontNavigation } from "@/components/marketing/storefront-navigation";
import { products } from "@/components/marketing/storefront-data";
import { filterProducts } from "@/lib/product-filter";

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
  const categoryProducts = filterProducts(products, { category });

  return (
    <div className="site-shell">
      <StorefrontHeader navItems={storefrontNavigation} />

      <main id="main-content">
        <section className="section" aria-labelledby="category-title">
          <div className="product-heading-row">
            <div className="section-heading">
              <h1 id="category-title">{title}</h1>
              <p>{description}</p>
            </div>
            <p className="product-count">{categoryProducts.length} mẫu đang hiển thị</p>
          </div>

          <div className="product-grid">
            {categoryProducts.map((product) => (
              <article className="product-card" key={product.name}>
                <img alt={product.name} decoding="async" loading="lazy" src={product.image} />
                <div className="product-info">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.category}</p>
                  </div>
                  <span className="product-tag">{product.tag}</span>
                  <strong>{product.price}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <StorefrontFooter />
    </div>
  );
}
