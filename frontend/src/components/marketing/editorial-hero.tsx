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
  const handleVideoError = () => setHasError(true);

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
      <div className="advert-hero__copy">
        <h1 id="page-title">
          Chọn kính phù hợp.{" "}
          <br />
          An tâm cho đôi mắt.
        </h1>
        <p className="advert-hero__intro">
          Đo khám thị lực, kiểm tra khúc xạ và tư vấn kính thuốc tại Anh Thi,
          Vĩnh Long. Cùng bạn chọn chiếc kính vừa vặn với nhu cầu mỗi ngày.
        </p>
        <div className="advert-hero__actions">
          <Link className="primary-button" href="/#eye-exam">
            Đặt lịch đo mắt
          </Link>
          <Link className="text-button" href="/#bestsellers">
            Xem mẫu kính
            <ArrowRight aria-hidden="true" size={18} strokeWidth={1.6} />
          </Link>
        </div>
        <Link className="advert-hero__doctor" href="/bac-si">
          <span>Bác sĩ CKII Nguyễn Anh Thi</span>{" "}
          <span>Hơn 20 năm kinh nghiệm chăm sóc đôi mắt</span>
        </Link>
      </div>

      <figure className="advert-hero__media">
        <video
          aria-label="Video giới thiệu Kính thuốc Anh Thi"
          autoPlay={!reduceMotion}
          className="advert-hero__video"
          controls
          height={1080}
          loop
          muted
          onError={handleVideoError}
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
        <figcaption className="advert-hero__caption">
          <span>Gặp gỡ Kính thuốc Anh Thi</span>
          <span>Bật âm thanh để nghe giới thiệu</span>
        </figcaption>
        {hasError ? (
          <p className="advert-hero__error" role="alert">
            Video chưa tải được. <a href={VIDEO_SRC}>Mở video trực tiếp</a> hoặc
            khám phá các mẫu kính bên dưới.
          </p>
        ) : null}
      </figure>
    </section>
  );
}
