"use client";

import type { FocusEvent, ReactNode } from "react";

export function BrandStoryRail({ children }: { children: ReactNode }) {
  function revealFocusedBrand(event: FocusEvent<HTMLDivElement>) {
    const rail = event.currentTarget;
    const target = event.target;

    if (rail.scrollWidth > rail.clientWidth && target.matches(":focus-visible")) {
      target.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: "instant",
      });
    }
  }

  return (
    <div className="brand-stories" onFocusCapture={revealFocusedBrand}>
      {children}
    </div>
  );
}
