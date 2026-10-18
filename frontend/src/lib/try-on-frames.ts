import { eyewearProducts } from "./eyewear-catalog";

type FrameMask = {
  image: string;
  referenceWidth: number;
  bounds: [number, number, number, number];
  /** Hand-traced front contours in reference-image coordinates. */
  outer: string;
  lenses: [string, string];
  eyeLine: number;
  tint?: string;
  keepHighlights?: boolean;
  noseCut?: string;
};

// The photograph supplies the actual rim texture. Masks remove the background,
// folded temples, lens labels and price tags; no generated product photographs.
export const tryOnFrames: Record<string, FrameMask> = {
  "bolon-gong-vuong": {
    image: "/images/collections/photo_2026-10-17_22-45-46.webp", referenceWidth: 900,
    bounds: [66, 694, 718, 239], eyeLine: 0.43,
    outer: "M69 721 Q241 686 345 716 Q378 723 395 736 Q425 733 458 733 Q514 691 620 696 Q705 693 781 708 L780 764 Q756 773 751 800 Q739 881 711 905 Q684 928 581 922 Q520 920 496 895 Q470 869 453 805 Q448 784 425 786 Q410 785 402 809 Q382 884 356 907 Q328 934 221 929 Q150 929 127 906 Q109 888 100 835 Q94 790 71 778 Z",
    lenses: [
      "M128 747 Q223 719 330 738 Q371 746 381 770 Q389 796 372 842 Q359 887 334 902 Q307 918 221 917 Q160 916 142 898 Q121 873 117 826 Q111 769 128 747 Z",
      "M487 750 Q552 721 644 725 Q703 725 723 744 Q737 758 728 816 Q721 878 700 897 Q680 914 582 913 Q529 912 510 891 Q486 861 475 811 Q464 768 487 750 Z",
    ],
  },
  "new-balance-gong-kim-loai": {
    image: "/images/collections/photo_2026-10-17_23-37-56.webp", referenceWidth: 900,
    bounds: [102, 685, 712, 241], eyeLine: 0.42, keepHighlights: true,
    outer: "M103 744 L137 744 Q139 705 179 693 Q254 672 350 698 Q395 711 401 751 Q449 729 501 750 Q505 710 544 696 Q623 673 720 691 Q771 704 777 747 L813 748 L813 769 L776 768 Q771 851 740 888 Q707 927 625 924 Q546 924 520 897 Q494 869 497 808 L498 765 Q448 745 403 766 Q407 843 374 885 Q346 922 260 920 Q187 919 163 887 Q138 852 136 767 L103 765 Z",
    lenses: [
      "M144 748 Q147 710 184 699 Q254 681 348 703 Q390 715 396 753 Q404 836 369 881 Q341 916 261 915 Q192 914 169 883 Q144 848 143 791 Z",
      "M506 751 Q510 715 548 702 Q624 680 718 697 Q766 708 771 750 Q774 832 736 884 Q705 920 625 919 Q551 919 525 892 Q499 864 503 810 Z",
    ],
  },
};

export const tryOnProducts = eyewearProducts.filter((product) => tryOnFrames[product.slug]);

export async function prepareFrame(slug: string): Promise<HTMLCanvasElement> {
  const config = tryOnFrames[slug];
  if (!config) throw new Error("No calibrated try-on asset for this product");
  const photo = new Image();
  photo.src = config.image;
  await photo.decode();
  const [x, y, width, height] = config.bounds;
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(width);
  canvas.height = Math.ceil(height);
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas unavailable");
  context.translate(-x, -y);
  context.save();
  context.clip(new Path2D(config.outer));
  const ratio = config.referenceWidth / photo.naturalWidth;
  context.drawImage(photo, 0, 0, config.referenceWidth, photo.naturalHeight * ratio);
  context.restore();
  context.globalCompositeOperation = "destination-out";
  config.lenses.forEach((path) => context.fill(new Path2D(path)));
  if (config.noseCut) context.fill(new Path2D(config.noseCut));
  context.globalCompositeOperation = "source-over";
  if (!config.keepHighlights) {
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < pixels.data.length; i += 4) {
      const lightestBackground = Math.min(pixels.data[i], pixels.data[i + 1], pixels.data[i + 2]);
      pixels.data[i + 3] *= Math.min(1, Math.max(0, (220 - lightestBackground) / 45));
    }
    context.putImageData(pixels, 0, 0);
  }
  // Support the narrow photographed rims where specular highlights become
  // transparent in the matte, using the same calibrated lens contours.
  context.globalCompositeOperation = "destination-over";
  context.strokeStyle = config.keepHighlights ? "#8d9092" : "#2e3537";
  context.lineWidth = config.referenceWidth * (config.keepHighlights ? 0.0015 : 0.0035);
  config.lenses.forEach((path) => context.stroke(new Path2D(path)));
  context.globalCompositeOperation = "source-over";
  if (config.tint) {
    context.fillStyle = config.tint;
    config.lenses.forEach((path) => context.fill(new Path2D(path)));
  }
  return canvas;
}
