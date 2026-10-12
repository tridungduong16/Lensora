import { toBlob } from "html-to-image";
import styles from "@/app/bang-gia/pricing.module.css";

const EXPORT_WIDTH = 1200;

export async function exportPricePng(source: HTMLElement, filename: string) {
  const container = document.createElement("div");
  container.className = styles.page;
  container.setAttribute("aria-hidden", "true");
  container.inert = true;
  Object.assign(container.style, {
    position: "fixed",
    left: "-20000px",
    top: "0",
    width: `${EXPORT_WIDTH}px`,
    padding: "0",
    pointerEvents: "none",
  });

  // Capture a separate copy so exporting never changes the visible page.
  const copy = source.cloneNode(true) as HTMLElement;
  copy.classList.add(styles.pngExport);
  copy.querySelectorAll("[data-png-exclude]").forEach((element) => element.remove());
  copy.removeAttribute("id");
  copy.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
  container.append(copy);
  document.body.append(container);

  let downloadUrl: string | undefined;

  try {
    await document.fonts.ready;

    // Keep long tables within mobile canvas memory and dimension limits.
    const height = copy.scrollHeight;
    const pixelRatio = Math.min(2, 8192 / height, Math.sqrt(16_000_000 / (EXPORT_WIDTH * height)));
    const blob = await toBlob(copy, {
      width: EXPORT_WIDTH,
      height,
      pixelRatio,
      preferredFontFormat: "woff2",
    });
    if (!blob) throw new Error("Không thể tạo ảnh PNG.");

    downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${filename}.png`;
    document.body.append(link);
    try {
      link.click();
    } finally {
      link.remove();
    }
  } finally {
    container.remove();
    if (downloadUrl) {
      const url = downloadUrl;
      // Give the browser time to begin reading the downloaded blob.
      window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
    }
  }
}
