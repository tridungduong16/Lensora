"use client";

export function PrintPriceButton() {
  return (
    <button className="lens-pricing-print" onClick={() => window.print()} type="button">
      In bảng giá
    </button>
  );
}
