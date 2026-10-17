"use client";

import Image from "next/image";
import { useState } from "react";
import type { EyewearProduct } from "@/lib/eyewear-catalog";

export function ProductGallery({
  images,
  name,
}: {
  images: EyewearProduct["images"];
  name: string;
}) {
  const [active, setActive] = useState(0);
  return (
    <div className="product-gallery">
      <div className="product-gallery__main">
        <Image
          src={images[active].src}
          alt={images[active].alt}
          width={1000}
          height={750}
          priority
          sizes="(max-width: 860px) 100vw, 55vw"
        />
      </div>
      <div
        className="product-gallery__thumbnails"
        aria-label={`Các góc ảnh ${name}`}
      >
        {images.map((image, index) => (
          <button
            type="button"
            onClick={() => setActive(index)}
            aria-pressed={active === index}
            aria-label={`Xem góc ảnh ${index + 1} của ${name}`}
            key={image.src}
          >
            <Image
              src={image.src}
              alt=""
              width={120}
              height={90}
              sizes="90px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
