"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function RouteScroll() {
  const pathname = usePathname();
  const previousPath = useRef(pathname);
  const restoringHistory = useRef(false);

  useEffect(() => {
    function onPopState() {
      restoringHistory.current = true;
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const pathChanged = previousPath.current !== pathname;
    previousPath.current = pathname;
    if (restoringHistory.current) {
      restoringHistory.current = false;
      return;
    }
    if (!window.location.hash) {
      if (pathChanged)
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    // The home page streams its sections, so the browser can process the
    // fragment before the matching element has arrived.
    let targetId: string;
    try {
      targetId = decodeURIComponent(window.location.hash.slice(1));
    } catch {
      return;
    }
    const scrollToTarget = () => {
      const target = document.getElementById(targetId);
      if (!target) return false;
      target.scrollIntoView({ block: "start", behavior: "instant" });
      return true;
    };
    if (scrollToTarget()) return;
    const observer = new MutationObserver(() => {
      if (scrollToTarget()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => observer.disconnect(), 5000);
    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  return null;
}
