"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useId, useMemo, useRef, useState } from "react";
import { eyewearBrands, type EyewearProduct } from "@/lib/eyewear-catalog";
import { filterProducts } from "@/lib/product-filter";
import { ProductCard } from "./product-card";

type ProductCatalogProps = {
  products: EyewearProduct[];
  initialBrand?: string;
  initialQuery?: string;
  initialCategory?: string;
  fixedCategory?: string;
};

export function ProductCatalog({
  products,
  initialBrand = "",
  initialQuery = "",
  initialCategory = "",
  fixedCategory,
}: ProductCatalogProps) {
  const id = useId();
  const [brand, setBrand] = useState(initialBrand);
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [budget, setBudget] = useState("");
  const [sort, setSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filterToggle = useRef<HTMLButtonElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const activeFilters = [
    ...(!fixedCategory && category
      ? [{ key: "category", label: category, clear: () => setCategory("") }]
      : []),
    ...(budget
      ? [{
          key: "budget",
          label: `Đến ${Number(budget).toLocaleString("vi-VN")} ₫`,
          clear: () => setBudget(""),
        }]
      : []),
    ...(sort !== "featured"
      ? [{
          key: "sort",
          label: sort === "price-asc" ? "Giá tăng dần" : "Giá giảm dần",
          clear: () => setSort("featured"),
        }]
      : []),
  ];
  const advancedFilterCount = activeFilters.length;
  const hasFilters = Boolean(brand || query || advancedFilterCount);
  const visibleProducts = useMemo(() => {
    const result = filterProducts(products, {
      brand,
      query,
      category: fixedCategory || category,
      maxPrice: Number(budget) || undefined,
    });
    if (sort !== "featured")
      result.sort((a, b) =>
        sort === "price-asc"
          ? a.priceValue - b.priceValue
          : b.priceValue - a.priceValue,
      );
    return result;
  }, [products, brand, query, category, fixedCategory, budget, sort]);

  function clearFilters() {
    setBrand("");
    setQuery("");
    setCategory("");
    setBudget("");
    setSort("featured");
    summaryRef.current?.focus();
  }

  return (
    <div className="catalog">
      <div className="catalog__brands" aria-label="Lọc theo thương hiệu">
        {["", ...eyewearBrands].map((item) => (
          <button
            type="button"
            aria-pressed={brand === item}
            aria-label={item || "Tất cả thương hiệu"}
            key={item}
            onClick={() => setBrand(item)}
          >
            {item || "Tất cả"}
          </button>
        ))}
      </div>
      <div className="catalog__filters">
        <div className="catalog__search">
          <label className="sr-only" htmlFor={`${id}-query`}>
            Tìm mẫu kính
          </label>
          <Search size={18} strokeWidth={1.5} aria-hidden="true" />
          <input
            id={`${id}-query`}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm mẫu kính…"
          />
        </div>
        <button
          ref={filterToggle}
          className="catalog__filter-toggle"
          aria-label="Bộ lọc và sắp xếp"
          type="button"
          aria-expanded={filtersOpen}
          aria-controls={`${id}-options`}
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <SlidersHorizontal size={18} aria-hidden="true" />
          Bộ lọc
          {advancedFilterCount ? <span>{advancedFilterCount}</span> : null}
        </button>
        <div
          id={`${id}-options`}
          className={`catalog__selects${filtersOpen ? " is-open" : ""}`}
        >
          {!fixedCategory ? (
            <div className="catalog__select">
              <label htmlFor={`${id}-category`}>Loại kính</label>
              <select
                id={`${id}-category`}
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value="">Tất cả</option>
                <option value="Gọng kính">Gọng kính</option>
                <option value="Kính mát">Kính mát</option>
              </select>
            </div>
          ) : null}
          <div className="catalog__select">
            <label htmlFor={`${id}-budget`}>Ngân sách</label>
            <select
              id={`${id}-budget`}
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
            >
              <option value="">Mọi mức giá</option>
              <option value="1000000">Đến 1 triệu</option>
              <option value="1800000">Đến 1,8 triệu</option>
              <option value="2500000">Đến 2,5 triệu</option>
            </select>
          </div>
          <div className="catalog__select">
            <label htmlFor={`${id}-sort`}>Sắp xếp</label>
            <select
              id={`${id}-sort`}
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="featured">Gợi ý khám phá</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
            </select>
          </div>
          <button
            className="primary-button catalog__apply"
            type="button"
            onClick={() => {
              setFiltersOpen(false);
              filterToggle.current?.focus();
            }}
          >
            Xem {visibleProducts.length} mẫu kính
          </button>
        </div>
      </div>
      {activeFilters.length ? (
        <div
          className="catalog__active-filters"
          role="group"
          aria-label="Bộ lọc đang áp dụng"
        >
          {activeFilters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              aria-label={`Bỏ lựa chọn: ${filter.label}`}
              onClick={() => {
                filter.clear();
                summaryRef.current?.focus();
              }}
            >
              {filter.label}
              <X size={14} aria-hidden="true" />
            </button>
          ))}
        </div>
      ) : null}
      <div className="catalog__summary">
        <p role="status" aria-live="polite" tabIndex={-1} ref={summaryRef}>
          {visibleProducts.length} mẫu kính{brand ? ` ${brand}` : ""}
          {query ? ` phù hợp với “${query}”` : ""}
        </p>
        {hasFilters ? (
          <button type="button" onClick={clearFilters}>
            <X size={15} aria-hidden="true" />
            Xóa bộ lọc
          </button>
        ) : (
          <span>
            <SlidersHorizontal size={15} aria-hidden="true" />
            Chọn mẫu để xem chi tiết
          </span>
        )}
      </div>
      {visibleProducts.length ? (
        <div className="eyewear-grid">
          {visibleProducts.map((product) => (
            <ProductCard product={product} key={product.slug} />
          ))}
        </div>
      ) : (
        <div className="catalog__empty">
          <Search size={32} strokeWidth={1} aria-hidden="true" />
          <h3>Chưa tìm thấy mẫu phù hợp</h3>
          <p>Thử một mã kính khác hoặc mở rộng ngân sách của bạn.</p>
          <button
            className="outline-button"
            type="button"
            onClick={clearFilters}
          >
            Xem tất cả mẫu kính
          </button>
        </div>
      )}
      <p className="catalog__note">
        Giá và ảnh tham khảo từ các nhà bán lẻ, cập nhật ngày 17/10/2026. Giá
        gọng chưa gồm tròng kính thuốc. Liên hệ Anh Thi để xác nhận giá bán, màu
        và mẫu hiện có.
      </p>
    </div>
  );
}
