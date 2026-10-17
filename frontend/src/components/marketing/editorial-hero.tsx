"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const VIDEO_SRC =
  "/videos/gioi_thieu_kinh_thuoc_anh_thi_ngang_1920x1080.mp4";
const PORTRAIT_VIDEO_SRC = "/videos/anh-thi-advertisement-portrait.mp4";

export function EditorialHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const videoSrc = isMobile ? PORTRAIT_VIDEO_SRC : VIDEO_SRC;
  const videoPoster = isMobile
    ? "/videos/anh-thi-advertisement-portrait-poster.jpg"
    : "/videos/anh-thi-introduction-poster.jpg";
  const handleVideoError = () => setHasError(true);

  useEffect(() => {
    const media = window.matchMedia?.("(max-width: 860px)");
    const update = () => {
      setIsMobile(media?.matches ?? false);
      setHasError(false);
    };
    update();
    media?.addEventListener("change", update);
    return () => media?.removeEventListener("change", update);
  }, []);

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
    if (!video || isMobile === null) return;

    if (reduceMotion) {
      if (!video.paused) video.pause();
      return;
    }

    // Browser settings may block autoplay; native controls still allow playback.
    video.play()?.catch(() => undefined);
  }, [reduceMotion, isMobile]);

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
          height={isMobile ? 1920 : 1080}
          loop
          muted
          onError={handleVideoError}
          playsInline
          poster={isMobile === null ? undefined : videoPoster}
          preload="metadata"
          ref={videoRef}
          src={isMobile === null ? undefined : videoSrc}
          width={isMobile ? 1080 : 1920}
        >
          Trình duyệt của bạn chưa hỗ trợ video.{" "}
          <a href={videoSrc}>Mở video giới thiệu Anh Thi</a>.
        </video>
        <figcaption className="advert-hero__caption">
          <span>Gặp gỡ Kính thuốc Anh Thi</span>
          <span>Bật âm thanh để nghe giới thiệu</span>
        </figcaption>
        {hasError ? (
          <p className="advert-hero__error" role="alert">
            Video chưa tải được. <a href={videoSrc}>Mở video trực tiếp</a> hoặc
            khám phá các mẫu kính bên dưới.
          </p>
        ) : null}
      </figure>
    </section>
  );
}
