"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export type NavigationItem = {
  label: string;
  href: string;
};

type StorefrontHeaderProps = {
  navItems: NavigationItem[];
  overlay?: boolean;
};

export function StorefrontHeader({
  navItems,
  overlay = false,
}: StorefrontHeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const middleIndex = Math.ceil(navItems.length / 2);
  const leftNavItems = navItems.slice(0, middleIndex);
  const rightNavItems = navItems.slice(middleIndex);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(
    () => setIsMenuOpen((open) => !open),
    [],
  );

  useEffect(() => {
    if (!overlay || typeof IntersectionObserver === "undefined") {
      return;
    }

    const hero = document.querySelector(".editorial-hero");
    if (!hero) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsScrolled(!entry.isIntersecting),
      { threshold: 0.08 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [overlay]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [closeMenu, isMenuOpen]);

  const headerClassName = [
    "site-header",
    overlay ? "site-header--overlay" : "",
    overlay && isScrolled ? "is-scrolled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClassName}>
      <div className="desktop-navigation">
        <nav className="desktop-nav desktop-nav--left" aria-label="Điều hướng chính bên trái">
          {leftNavItems.map((item) => (
            <Link
              aria-current={pathname === item.href ? "page" : undefined}
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="brand" href="/" aria-label="Trang chủ Kính thuốc Anh Thi">
          <span className="brand-name">ANH THI</span>
          <span className="brand-descriptor">EYEGLASSES</span>
        </Link>

        <nav className="desktop-nav desktop-nav--right" aria-label="Điều hướng chính bên phải">
          {rightNavItems.map((item) => (
            <Link
              aria-current={pathname === item.href ? "page" : undefined}
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="header-actions">
        <Link className="header-appointment" href="/#eye-exam">
          Đặt lịch đo mắt
        </Link>
        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
          className="mobile-menu"
          onClick={toggleMenu}
          type="button"
        >
          {isMenuOpen ? (
            <X aria-hidden="true" size={21} strokeWidth={1.75} />
          ) : (
            <Menu aria-hidden="true" size={21} strokeWidth={1.75} />
          )}
        </button>
      </div>

      {isMenuOpen ? (
        <div className="mobile-menu-panel" id="mobile-navigation">
          <nav aria-label="Điều hướng trên di động" className="mobile-nav">
            {navItems.map((item) => (
              <Link
                aria-current={pathname === item.href ? "page" : undefined}
                href={item.href}
                key={item.label}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
            <Link
              className="mobile-appointment"
              href="/#eye-exam"
              onClick={closeMenu}
            >
              Đặt lịch đo mắt
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
