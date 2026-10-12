"use client";

import { Download, LoaderCircle } from "lucide-react";
import { useState } from "react";
import styles from "@/app/bang-gia/pricing.module.css";

type ExportPriceButtonProps = {
  targetId: string;
  filename: string;
};

export function ExportPriceButton({ targetId, filename }: ExportPriceButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function handleExport() {
    if (isExporting) return;

    setIsExporting(true);
    setFeedback("");

    try {
      const target = document.getElementById(targetId);
      if (!target) throw new Error("Không tìm thấy bảng giá.");

      const { exportPricePng } = await import("@/lib/export-price-png");
      await exportPricePng(target, filename);
      setFeedback("Đã tải ảnh PNG.");
    } catch {
      setFeedback("Chưa thể xuất ảnh. Bạn thử lại nhé.");
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <div className={styles.exportControl}>
      <button
        aria-busy={isExporting}
        className={styles.exportButton}
        disabled={isExporting}
        onClick={handleExport}
        type="button"
      >
        {isExporting ? (
          <LoaderCircle aria-hidden="true" className={styles.exportSpinner} size={16} strokeWidth={1.5} />
        ) : (
          <Download aria-hidden="true" size={16} strokeWidth={1.5} />
        )}
        {isExporting ? "Đang xuất…" : "Xuất PNG"}
      </button>
      <p className={styles.exportFeedback} role="status" aria-live="polite">{feedback}</p>
    </div>
  );
}
