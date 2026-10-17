import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatVnd, type EyewearProduct } from "@/lib/eyewear-catalog";

export function ProductCard({ product }: { product: EyewearProduct }) {
  return (
    <article className="eyewear-card">
      <Link
        className="eyewear-card__image"
        href={`/san-pham/${product.slug}`}
        aria-label={`Xem ${product.name}`}
      >
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          width={720}
          height={540}
          sizes="(max-width: 600px) 50vw, (max-width: 1000px) 50vw, 33vw"
        />
        <span className="eyewear-card__arrow" aria-hidden="true">
          <ArrowUpRight size={20} strokeWidth={1.5} />
        </span>
      </Link>
      <div className="eyewear-card__body">
        <p className="eyewear-card__brand">{product.brand}</p>
        <h3>
          <Link href={`/san-pham/${product.slug}`}>{product.model}</Link>
        </h3>
        <p className="eyewear-card__spec">
          {product.shape} · {product.material}
        </p>
        <p className="eyewear-card__description">{product.description}</p>
        <div className="eyewear-card__price">
          <strong>{formatVnd(product.priceValue)}</strong>
          <span>Giá tham khảo</span>
        </div>
      </div>
    </article>
  );
}
