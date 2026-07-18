"use client";

import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  type SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import model1 from "../../../model1.jpg";
import model2 from "../../../model2.png";
import model3 from "../../../model3.jpg";

type HeroSlide = {
  src: StaticImageData;
  alt: string;
  imageClassName: string;
};

const heroSlides: readonly HeroSlide[] = [
  {
    src: model1,
    alt: "Người mẫu đeo kính Anh Thi — phong cách tối giản",
    imageClassName: "editorial-hero__image editorial-hero__image--one",
  },
  {
    src: model2,
    alt: "Người mẫu đeo kính Anh Thi — bộ sưu tập hiện đại",
    imageClassName: "editorial-hero__image editorial-hero__image--two",
  },
  {
    src: model3,
    alt: "Người mẫu đeo kính Anh Thi — thiết kế cao cấp",
    imageClassName: "editorial-hero__image editorial-hero__image--three",
  },
];

const AUTOPLAY_MS = 5500;

function findAvailableSlide(
  start: number,
  direction: 1 | -1,
  failedIndexes: readonly number[],
) {
  for (let offset = 1; offset <= heroSlides.length; offset += 1) {
    const candidate =
      (start + direction * offset + heroSlides.length) % heroSlides.length;

    if (!failedIndexes.includes(candidate)) {
      return candidate;
    }
  }

  return start;
}

export function EditorialHero() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [failedIndexes, setFailedIndexes] = useState<readonly number[]>([]);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) =>
      findAvailableSlide(current, -1, failedIndexes),
    );
  }, [failedIndexes]);

  const showNext = useCallback(() => {
    setActiveIndex((current) =>
      findAvailableSlide(current, 1, failedIndexes),
    );
  }, [failedIndexes]);

  const togglePlayback = useCallback(() => {
    setIsPlaying((current) => !current);
  }, []);

  const handleImageError = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      const failedIndex = Number(event.currentTarget.dataset.slideIndex);
      const nextFailedIndexes = failedIndexes.includes(failedIndex)
        ? failedIndexes
        : [...failedIndexes, failedIndex];

      setFailedIndexes(nextFailedIndexes);
      setActiveIndex((current) =>
        current === failedIndex
          ? findAvailableSlide(current, 1, nextFailedIndexes)
          : current,
      );
    },
    [failedIndexes],
  );

  useEffect(() => {
    if (reduceMotion || !isPlaying) {
      return;
    }

    const timer = window.setInterval(showNext, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [isPlaying, reduceMotion, showNext]);

  const activeSlide = heroSlides[activeIndex];

  return (
    <section className="editorial-hero" aria-labelledby="page-title">
      <div className="editorial-hero__copy">
        <h1 id="page-title">Nhìn rõ hơn.</h1>
        <p>Đo mắt chuẩn y khoa với hơn 20 năm kinh nghiệm.</p>

        <div className="editorial-hero__actions">
          <Link className="primary-button" href="/#eye-exam">
            Đặt lịch đo mắt
          </Link>
          <Link className="text-button" href="/#collections">
            Xem bộ sưu tập
            <ArrowRight aria-hidden="true" size={18} strokeWidth={1.6} />
          </Link>
        </div>
      </div>

      <div className="editorial-hero__media">
        {heroSlides.map((slide, index) => (
          <motion.div
            animate={{
              opacity: index === activeIndex ? 1 : 0,
              scale: index === activeIndex && !reduceMotion ? 1.02 : 1,
            }}
            aria-hidden={index !== activeIndex}
            className="editorial-hero__slide"
            initial={false}
            key={slide.alt}
            transition={{ duration: reduceMotion ? 0 : 0.8, ease: "easeInOut" }}
          >
            <Image
              alt={slide.alt}
              className={slide.imageClassName}
              data-slide-index={index}
              height={slide.src.height}
              onError={handleImageError}
              priority={index === 0}
              sizes="(min-width: 861px) 60vw, 100vw"
              src={slide.src}
              width={slide.src.width}
            />
          </motion.div>
        ))}

        <div className="editorial-hero__controls" aria-label="Điều khiển ảnh người mẫu">
          <button aria-label="Ảnh trước" onClick={showPrevious} type="button">
            <ArrowLeft aria-hidden="true" size={20} strokeWidth={1.5} />
          </button>
          <span aria-live="polite">
            {String(activeIndex + 1).padStart(2, "0")} / 03
          </span>
          <button
            aria-label={
              isPlaying ? "Tạm dừng chuyển ảnh" : "Tiếp tục chuyển ảnh"
            }
            onClick={togglePlayback}
            type="button"
          >
            {isPlaying ? (
              <Pause aria-hidden="true" size={18} strokeWidth={1.5} />
            ) : (
              <Play aria-hidden="true" size={18} strokeWidth={1.5} />
            )}
          </button>
          <button aria-label="Ảnh tiếp theo" onClick={showNext} type="button">
            <ArrowRight aria-hidden="true" size={20} strokeWidth={1.5} />
          </button>
        </div>

        <span className="sr-only" aria-live="polite">
          {activeSlide.alt}
        </span>
      </div>
    </section>
  );
}
