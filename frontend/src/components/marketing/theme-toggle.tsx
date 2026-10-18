"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    let preference: string | null | undefined;
    try {
      preference = window.localStorage.getItem?.("anh-thi-theme");
    } catch {
      /* Keep the light default when storage is unavailable. */
    }
    const next = preference === "dark";
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
  }, []);
  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      window.localStorage.setItem?.("anh-thi-theme", next ? "dark" : "light");
    } catch {
      /* The toggle still works without persistence. */
    }
  }
  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggle}
      aria-label={
        dark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"
      }
    >
      {dark ? (
        <Sun size={19} strokeWidth={1.5} />
      ) : (
        <Moon size={19} strokeWidth={1.5} />
      )}
    </button>
  );
}
