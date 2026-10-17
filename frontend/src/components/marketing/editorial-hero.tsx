"use client";

import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { type SyntheticEvent, useCallback, useEffect, useState } from "react";
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
    alt: "Người mẫu đeo kính Anh Thi, phong cách tối giản",
    imageClassName: "editorial-hero__image editorial-hero__image--one",
  },
  {
    src: model2,
    alt: "Người mẫu đeo kính Anh Thi, bộ sưu tập hiện đại",
    imageClassName: "editorial-hero__image editorial-hero__image--two",
  },
  {
    src: model3,
    alt: "Người mẫu đeo kính Anh Thi, thiết kế cao cấp",
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
  const [reduceMotion, setReduceMotion] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [imagesReady, setImagesReady] = useState(false);
  const [failedIndexes, setFailedIndexes] = useState<readonly number[]>([]);

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!media) return;
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => findAvailableSlide(current, -1, failedIndexes));
  }, [failedIndexes]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => findAvailableSlide(current, 1, failedIndexes));
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
    if (reduceMotion || !isPlaying || !imagesReady) {
      return;
    }

    const timer = window.setInterval(showNext, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [isPlaying, reduceMotion, showNext, imagesReady]);

  const activeSlide = heroSlides[activeIndex];

  return (
    <section className="editorial-hero" aria-labelledby="page-title">
      <div className="editorial-hero__copy">
        <h1 id="page-title">Kính thuốc Anh Thi tại Vĩnh Long</h1>
        <p>
          Niềm tin và hi vọng cho đôi mắt của bạn. Đo mắt, tư vấn kính thuốc và
          thử gọng trực tiếp tại 85 Phạm Thái Bường.
        </p>

        <div className="editorial-hero__actions">
          <Link className="primary-button" href="/#eye-exam">
            Đặt lịch đo mắt
          </Link>
          <Link className="text-button" href="/#bestsellers">
            Xem mẫu kính
            <ArrowRight aria-hidden="true" size={18} strokeWidth={1.6} />
          </Link>
        </div>
      </div>

      <div className="editorial-hero__media">
        {heroSlides.map((slide, index) => (
          <div
            aria-hidden={index !== activeIndex}
            className="editorial-hero__slide"
            hidden={index !== activeIndex}
            key={slide.alt}
          >
            <Image
              alt={slide.alt}
              className={slide.imageClassName}
              data-slide-index={index}
              height={slide.src.height}
              onError={handleImageError}
              onLoad={() => setImagesReady(true)}
              loading={index === 0 || imagesReady ? "eager" : "lazy"}
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "low"}
              sizes={
                index === 1
                  ? "(min-width: 861px) 340px, calc((100vw - 80px) * 0.65)"
                  : "(min-width: 1400px) 600px, (min-width: 861px) 45vw, calc(100vw - 80px)"
              }
              src={slide.src}
              width={slide.src.width}
            />
          </div>
        ))}

        <div
          className="editorial-hero__controls"
          aria-label="Điều khiển ảnh người mẫu"
        >
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
