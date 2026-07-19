"use client";

import heroBackgroundVideo from "../../../images/4464848-hd_1280_720_50fps.mp4";

export function HeroBackgroundVideo() {
  return (
    <video
      aria-hidden="true"
      autoPlay
      className="hero-background-video"
      loop
      muted
      playsInline
      preload="metadata"
    >
      <source src={heroBackgroundVideo} type="video/mp4" />
    </video>
  );
}
