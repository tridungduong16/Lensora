"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import model1 from "../../../model1.jpg";
import model2 from "../../../model2.png";
import model3 from "../../../model3.jpg";

const heroSlides = [
  {
    src: model1,
    alt: "Người mẫu đeo kính Anh Thi — phong cách tối giản",
  },
  {
    src: model2,
    alt: "Người mẫu đeo kính Anh Thi — bộ sưu tập hiện đại",
  },
  {
    src: model3,
    alt: "Người mẫu đeo kính Anh Thi — thiết kế cao cấp",
  },
] as const;

const INTERVAL_MS = 5000;
const FADE_DURATION_S = 0.85;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  const activeSlide = heroSlides[index];

  return (
    <div
      className="hero-carousel"
      aria-label="Hình ảnh người mẫu Kính Anh Thi"
      aria-live="polite"
    >
      {heroSlides.map((slide, slideIndex) => (
        <motion.div
          key={slide.alt}
          className="hero-carousel-slide"
          animate={{ opacity: slideIndex === index ? 1 : 0 }}
          transition={{ duration: FADE_DURATION_S, ease: "easeInOut" }}
          aria-hidden={slideIndex !== index}
        >
          <Image
            alt={slide.alt}
            src={slide.src}
            className="hero-image"
            sizes="(min-width: 900px) 42vw, 100vw"
            priority={slideIndex === 0}
            placeholder="empty"
          />
        </motion.div>
      ))}

      <div className="hero-carousel-dots" aria-hidden="true">
        {heroSlides.map((_, dotIndex) => (
          <span
            key={dotIndex}
            className={
              dotIndex === index
                ? "hero-carousel-dot is-active"
                : "hero-carousel-dot"
            }
          />
        ))}
      </div>

      <span className="sr-only">{activeSlide.alt}</span>
    </div>
  );
}
