import Image from "next/image";
import Link from "next/link";
import brandLogo from "../../../logo.jpg";
import { ExportPriceButton } from "@/components/marketing/export-price-button";
import {
  lensPriceCategories,
  type LensPriceCategory,
  type LensPriceProduct,
} from "@/components/marketing/lens-pricing-data";
import { PrintPriceButton } from "@/components/marketing/print-price-button";
import styles from "@/app/bang-gia/pricing.module.css";
import { StorefrontHeader } from "./storefront-header";
import { StorefrontFooter } from "./storefront-footer";
import { storefrontNavigation } from "./storefront-navigation";

const formatPrice = (amount: number) =>
  `${new Intl.NumberFormat("vi-VN").format(amount)}đ`;

function ProductComparisonTable({
  products,
  columns,
  titleId,
}: {
  products: LensPriceProduct[];
  columns: string[];
  titleId: string;
}) {
  return (
    <div
      className={styles.comparisonScroll}
      role="region"
      aria-labelledby={titleId}
      tabIndex={0}
    >
      <table className={styles.comparisonTable} aria-labelledby={titleId}>
        <colgroup>
          <col className={styles.comparisonProductColumn} />
          <col className={styles.comparisonFeaturesColumn} />
          {columns.map((label) => (
            <col key={label} />
          ))}
          <col />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">Sản phẩm</th>
            <th scope="col">Tính năng</th>
            {columns.map((label) => (
              <th scope="col" key={label}>
                {label}
              </th>
            ))}
            <th scope="col">Giá lẻ / cặp</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <th scope="row" className={styles.productInfo}>
                {product.badge ? (
                  <span className={styles.productBadge}>{product.badge}</span>
                ) : null}
                <h4 id={product.id}>{product.name}</h4>
                {product.specifications
                  ?.filter(({ label }) => !columns.includes(label))
                  .map(({ label, value }) => (
                    <p key={label}>
                      <span>{label}</span>
                      {value}
                    </p>
                  ))}
              </th>
              <td>
                <ul className={styles.features}>
                  {product.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </td>
              {columns.map((label) => (
                <td key={label} className={styles.comparisonSpecification}>
                  {product.specifications?.find(
                    (specification) => specification.label === label,
                  )?.value ?? "Chưa có thông tin"}
                </td>
              ))}
              <td className={styles.priceCell}>
                <strong>
                  {product.price !== undefined
                    ? formatPrice(product.price)
                    : "Chưa có thông tin"}
                </strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProductPrice({ product }: { product: LensPriceProduct }) {
  if (product.price !== undefined) {
    const price = (
      <div className={styles.singlePrice}>
        <span>Giá lẻ / cặp</span>
        <strong>{formatPrice(product.price)}</strong>
      </div>
    );

    if (!product.specifications?.length) return price;

    return (
      <div className={styles.productDetails}>
        {price}
        <table
          className={styles.specificationTable}
          aria-label={`Thông tin ${product.name}`}
        >
          <thead>
            <tr>
              <th scope="col">Thông tin</th>
              <th scope="col">Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {product.specifications.map(({ label, value }) => (
              <tr key={label}>
                <th scope="row">{label}</th>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <table
      className={styles.offerTable}
      aria-label={`Thông số và giá ${product.name}`}
    >
      <colgroup>
        <col />
        <col />
        <col className={styles.priceColumn} />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">SPH</th>
          <th scope="col">CYL</th>
          <th scope="col">Giá lẻ / cặp</th>
        </tr>
      </thead>
      <tbody>
        {product.offers?.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td
                className={cell.kind === "price" ? styles.priceCell : undefined}
                key={cellIndex}
                rowSpan={cell.rowSpan}
              >
                {cell.kind === "price" ? (
                  <strong>{formatPrice(cell.amount)}</strong>
                ) : (
                  cell.lines.map((line, index) => (
                    <span key={index}>{line}</span>
                  ))
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function LensPricingPage({
  category: selectedCategory,
}: {
  category?: LensPriceCategory;
}) {
  const displayedCategories = selectedCategory ? [selectedCategory] : [];
  return (
    <div className="site-shell">
      <StorefrontHeader navItems={storefrontNavigation} />
      <div className={styles.page}>
        <div className={styles.sheet} id="price-sheet">
          <header className={styles.masthead}>
            <nav
              className={styles.topNavigation}
              aria-label="Điều hướng bảng giá"
              data-png-exclude
            >
              <Link href={selectedCategory ? "/bang-gia" : "/"}>
                {selectedCategory ? "← Các bảng giá" : "← Trang chủ"}
              </Link>
              {selectedCategory ? (
                <div className={styles.priceActions}>
                  <PrintPriceButton />
                  <ExportPriceButton
                    targetId="price-sheet"
                    filename={`bang-gia-${selectedCategory.id}-anh-thi`}
                  />
                </div>
              ) : null}
            </nav>
            <Link
              className={styles.brand}
              href="/"
              aria-label="Trang chủ Kính thuốc Anh Thi"
            >
              <Image alt="" src={brandLogo} width={144} height={144} priority />
            </Link>
            {selectedCategory?.heading ? (
              <h1>
                {selectedCategory.heading}
                <span>Kính thuốc Anh Thi</span>
              </h1>
            ) : (
              <h1>
                Bảng giá tròng kính{" "}
                <span>{selectedCategory?.title ?? "tham khảo"}</span>
              </h1>
            )}
            <p className={styles.tagline}>
              {selectedCategory?.tagline ??
                "Niềm tin và Hi vọng cho đôi mắt của bạn"}
            </p>
          </header>

          <main id="main-content" className={styles.content}>
            {selectedCategory ? (
              <nav
                className={styles.categoryNavigation}
                aria-label="Các nhóm tròng kính"
                data-png-exclude
              >
                {lensPriceCategories.map((category, index) => (
                  <Link
                    aria-current={
                      category.id === selectedCategory.id ? "page" : undefined
                    }
                    href={`/bang-gia/${category.id}`}
                    key={category.id}
                  >
                    <span>0{index + 1}</span>
                    {category.title}
                  </Link>
                ))}
              </nav>
            ) : (
              <div className={styles.categoryChoices}>
                {lensPriceCategories.map((category, index) => (
                  <Link
                    className={styles.categoryChoice}
                    href={`/bang-gia/${category.id}`}
                    key={category.id}
                  >
                    <span className={styles.categoryNumber}>0{index + 1}</span>
                    <div>
                      <h2>{category.title}</h2>
                      <p>{category.description}</p>
                      <span className={styles.choiceAction}>
                        Xem bảng giá →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className={styles.introduction}>
              <p>
                Giá niêm yết cho <strong>một cặp tròng kính</strong>.
              </p>
              {!selectedCategory ? (
                <p>Chọn nhóm tròng để xem tính năng, thông số và mức giá.</p>
              ) : null}
            </div>

            {displayedCategories.map((category) => (
              <section
                className={styles.category}
                id={category.id}
                aria-labelledby={`${category.id}-title`}
                key={category.id}
              >
                <div className={styles.categoryHeading}>
                  <span className={styles.categoryNumber}>
                    0
                    {lensPriceCategories.findIndex(
                      (item) => item.id === category.id,
                    ) + 1}
                  </span>
                  <div>
                    <h2 id={`${category.id}-title`}>{category.title}</h2>
                    <p>{category.description}</p>
                  </div>
                </div>

                {category.sections.map((section) => (
                  <section
                    className={styles.priceSection}
                    aria-labelledby={`${section.id}-title`}
                    key={section.id}
                  >
                    <h3
                      id={`${section.id}-title`}
                      className={styles.sectionHeading}
                    >
                      {section.title}
                    </h3>
                    {section.description ? (
                      <p className={styles.sectionDescription}>
                        {section.description}
                      </p>
                    ) : null}
                    {section.specificationColumns ? (
                      <ProductComparisonTable
                        products={section.products}
                        columns={section.specificationColumns}
                        titleId={`${section.id}-title`}
                      />
                    ) : (
                      <>
                        <div
                          className={styles.columnHeadings}
                          aria-hidden="true"
                        >
                          <span>Sản phẩm</span>
                          <span>Tính năng</span>
                          <span>Thông số & giá lẻ / cặp</span>
                        </div>
                        {section.products.map((product) => (
                          <article
                            className={styles.product}
                            aria-labelledby={product.id}
                            key={product.id}
                          >
                            <div className={styles.productInfo}>
                              {product.badge ? (
                                <span className={styles.productBadge}>
                                  {product.badge}
                                </span>
                              ) : null}
                              <h4 id={product.id}>{product.name}</h4>
                              {product.coating ? (
                                <p>
                                  <span>Lớp phủ</span>
                                  {product.coating
                                    .join(" / ")
                                    .replace(" / / ", " / ")}
                                </p>
                              ) : null}
                            </div>
                            <ul className={styles.features}>
                              {product.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                              ))}
                            </ul>
                            <ProductPrice product={product} />
                          </article>
                        ))}
                      </>
                    )}
                  </section>
                ))}

                {category.notes.length > 0 ? (
                  <aside
                    className={styles.notes}
                    aria-label={`Lưu ý về ${category.title.toLowerCase()}`}
                  >
                    <strong>Lưu ý</strong>
                    <ul>
                      {category.notes.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                  </aside>
                ) : null}
                <a
                  className={styles.backToTop}
                  href="#main-content"
                  data-png-exclude
                >
                  Về đầu bảng giá ↑
                </a>
              </section>
            ))}

            {selectedCategory ? (
              <aside
                className={styles.glossary}
                aria-label="Giải thích ký hiệu"
              >
                <p>
                  <strong>SPH</strong> Độ cầu (cận / viễn)
                </p>
                <p>
                  <strong>CYL</strong> Độ loạn
                </p>
                <p>
                  <strong>PL</strong> Độ cầu bằng 0
                </p>
              </aside>
            ) : null}
          </main>

          <footer className={styles.footer}>
            <Image
              className={styles.footerLogo}
              alt="Kính thuốc Anh Thi"
              src={brandLogo}
              width={144}
              height={144}
            />
            <div data-png-exclude>
              <Link href="/do-mat">Đặt lịch đo mắt</Link>
              <Link href="/cua-hang">Tư vấn tại cửa hàng</Link>
            </div>
          </footer>
        </div>
      </div>
      <StorefrontFooter />
    </div>
  );
}
