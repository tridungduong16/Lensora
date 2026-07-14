"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../../../logo.jpg";

export type NavigationItem = {
  label: string;
  href: string;
};

type StorefrontHeaderProps = {
  navItems: NavigationItem[];
};

export function StorefrontHeader({ navItems }: StorefrontHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const leftNavItems = navItems.slice(0, 2);
  const rightNavItems = navItems.slice(2);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <div className="desktop-navigation">
        <nav className="desktop-nav desktop-nav--left" aria-label="Điều hướng chính bên trái">
          {leftNavItems.map((item) => (
            <Link href={item.href} key={item.label}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="brand" href="/" aria-label="Trang chủ Kính thuốc Anh Thi">
          <Image alt="Kính thuốc Anh Thi" className="brand-logo" height={56} src={logo} width={56} />
        </Link>

        <nav className="desktop-nav desktop-nav--right" aria-label="Điều hướng chính bên phải">
          {rightNavItems.map((item) => (
            <Link href={item.href} key={item.label}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="header-actions">
        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
          className="mobile-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
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
              <Link href={item.href} key={item.label} onClick={closeMenu}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
