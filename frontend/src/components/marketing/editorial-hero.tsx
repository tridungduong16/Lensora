"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const VIDEO_SRC =
  "/videos/gioi_thieu_kinh_thuoc_anh_thi_ngang_1920x1080.mp4";

export function EditorialHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!media) return;

    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reduceMotion) {
      if (!video.paused) video.pause();
      return;
    }

    // Browser settings may block autoplay; native controls still allow playback.
    video.play()?.catch(() => undefined);
  }, [reduceMotion]);

  return (
    <section
      className="editorial-hero editorial-hero--video"
      aria-labelledby="page-title"
    >
      <h1 className="sr-only" id="page-title">
        Kính thuốc Anh Thi tại Vĩnh Long
      </h1>

      <video
        aria-label="Video giới thiệu Kính thuốc Anh Thi"
        autoPlay={!reduceMotion}
        className="advert-hero__video"
        controls
        height={1080}
        loop
        muted
        onError={() => setHasError(true)}
        playsInline
        poster="/videos/anh-thi-introduction-poster.jpg"
        preload="metadata"
        ref={videoRef}
        src={VIDEO_SRC}
        width={1920}
      >
        Trình duyệt của bạn chưa hỗ trợ video.{" "}
        <a href={VIDEO_SRC}>Mở video giới thiệu Anh Thi</a>.
      </video>

      {hasError ? (
        <p className="advert-hero__error" role="alert">
          Video chưa tải được. <a href={VIDEO_SRC}>Mở video trực tiếp</a> hoặc khám
          phá các mẫu kính bên dưới.
        </p>
      ) : null}

      <div className="advert-hero__actions">
        <Link className="primary-button" href="/#eye-exam">
          Đặt lịch đo mắt
        </Link>
        <Link className="text-button" href="/#bestsellers">
          Xem mẫu kính
          <ArrowRight aria-hidden="true" size={18} strokeWidth={1.6} />
        </Link>
      </div>
    </section>
  );
}
