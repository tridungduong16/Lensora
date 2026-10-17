import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Phone } from "lucide-react";
import {
  eyewearProducts,
  formatVnd,
  getEyewearProduct,
} from "@/lib/eyewear-catalog";
import { StorefrontHeader } from "@/components/marketing/storefront-header";
import { StorefrontFooter } from "@/components/marketing/storefront-footer";
import { storefrontNavigation } from "@/components/marketing/storefront-navigation";
import { ProductCard } from "@/components/marketing/product-card";
import { ProductGallery } from "@/components/marketing/product-gallery";
import { pageMetadata } from "@/lib/site-seo";
import { breadcrumbSchema } from "@/lib/local-business-schema";
import { StructuredData } from "@/components/marketing/structured-data";

type ProductPageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return eyewearProducts.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = getEyewearProduct((await params).slug);
  return product
    ? pageMetadata({
        title: `${product.name} | Kính thuốc Anh Thi Vĩnh Long`,
        description: `${product.description} Xem ảnh, thông số và giá tham khảo; liên hệ Anh Thi tại Vĩnh Long để xác nhận mẫu và màu.`,
        path: `/san-pham/${product.slug}`,
        image: product.images[0].src,
      })
    : { title: "Không tìm thấy mẫu kính | Anh Thi" };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = getEyewearProduct((await params).slug);
  if (!product) notFound();
  const related = eyewearProducts
    .filter(
      (item) => item.brand === product.brand && item.slug !== product.slug,
    )
    .slice(0, 3);
  return (
    <div className="site-shell product-detail-shell">
      <StructuredData
        data={breadcrumbSchema([
          { name: "Trang chủ", path: "/" },
          {
            name: product.category,
            path: product.category === "Kính mát" ? "/kinh-ram" : "/gong-kinh",
          },
          { name: product.name, path: `/san-pham/${product.slug}` },
        ])}
      />
      <StorefrontHeader navItems={storefrontNavigation} />
      <main className="product-detail-page" id="main-content">
        <nav className="breadcrumbs" aria-label="Đường dẫn">
          <Link href="/">Trang chủ</Link>
          <span aria-hidden="true">/</span>
          <Link
            href={product.category === "Kính mát" ? "/kinh-ram" : "/gong-kinh"}
          >
            {product.category}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.model}</span>
        </nav>
        <section className="product-detail" aria-labelledby="product-title">
          <ProductGallery images={product.images} name={product.name} />
          <div className="product-detail__info">
            <p className="eyebrow">{product.brand}</p>
            <h1 id="product-title">{product.model}</h1>
            <p className="product-detail__description">{product.description}</p>
            <div className="product-detail__price">
              <strong>{formatVnd(product.priceValue)}</strong>
              <span>
                Giá tham khảo
                {product.category === "Gọng kính"
                  ? " / gọng, chưa gồm tròng thuốc"
                  : " / kính mát"}
              </span>
            </div>
            <dl className="product-specs">
              <div>
                <dt>Thương hiệu</dt>
                <dd>{product.brand}</dd>
              </div>
              <div>
                <dt>Kiểu dáng</dt>
                <dd>{product.shape}</dd>
              </div>
              <div>
                <dt>Chất liệu</dt>
                <dd>{product.material}</dd>
              </div>
              <div>
                <dt>Màu tại nguồn</dt>
                <dd>
                  {product.colors.length
                    ? product.colors.join(", ")
                    : "Xem ảnh sản phẩm"}
                </dd>
              </div>
            </dl>
            <a className="primary-button" href="tel:+84858060789">
              <Phone size={18} aria-hidden="true" />
              Gọi tư vấn mẫu này
            </a>
            <Link className="text-link" href="/cua-hang">
              Thử kính tại cửa hàng
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <aside className="product-source">
              <h2>Thông tin tham khảo</h2>
              <p>
                Ảnh, giá và thông số từ{" "}
                <a href={product.sourceUrl} target="_blank" rel="noreferrer">
                  {product.sourceName}
                </a>
                , đối chiếu ngày 17/10/2026. Giá tại Anh Thi và tình trạng mẫu,
                màu cần được cửa hàng xác nhận.
              </p>
              <p>
                Ảnh minh họa đúng mã mẫu; các góc ảnh có thể là những phiên bản
                màu khác nhau.
              </p>
            </aside>
          </div>
        </section>
        <section className="product-related" aria-labelledby="related-title">
          <div className="refresh-heading">
            <h2 id="related-title">Khám phá thêm {product.brand}</h2>
          </div>
          <div className="eyewear-grid">
            {related.map((item) => (
              <ProductCard product={item} key={item.slug} />
            ))}
          </div>
        </section>
      </main>
      <StorefrontFooter />
      <aside className="mobile-product-contact" aria-label="Tư vấn mẫu kính">
        <div>
          <span>Giá tham khảo</span>
          <strong>{formatVnd(product.priceValue)}</strong>
        </div>
        <a className="primary-button" href="tel:+84858060789">
          <Phone size={18} aria-hidden="true" />
          Gọi tư vấn
          <span className="sr-only"> {product.name}</span>
        </a>
      </aside>
    </div>
  );
}
