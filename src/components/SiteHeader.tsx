"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type Item = { label: string; href: string };
type Group = { label: string; href: string; children?: Item[] };

const NAV: Group[] = [
  {
    label: "News",
    href: "/news",
    children: [
      { label: "All News", href: "/news" },
      { label: "Sports", href: "/sports" },
    ],
  },
  {
    label: "Media",
    href: "/media",
    children: [
      { label: "Media Home", href: "/media" },
      { label: "Movies", href: "/media/movies" },
      { label: "Series", href: "/media/series" },
    ],
  },
  {
    label: "Community",
    href: "/community",
    children: [
      { label: "Community Home", href: "/community" },
      { label: "Events", href: "/events" },
      { label: "Local Resources", href: "/resources" },
    ],
  },
  { label: "About", href: "/about" },
];

export default function SiteHeader() {
  const [openMobile, setOpenMobile] = useState(false);
  const [shadow, setShadow] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  // shared close timer so dropdowns don't snap shut instantly
  const closeTimer = useRef<number | null>(null);
  const cancelClose = () => {
    if (closeTimer.current != null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = (detailsEl: HTMLDetailsElement) => {
    cancelClose();
    // desktop only
    if (window.innerWidth < 768) return;
    closeTimer.current = window.setTimeout(() => {
      detailsEl.open = false;
    }, 220) as unknown as number;
  };

  useEffect(() => {
    const onScroll = () => setShadow(window.scrollY > 6);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMobile(false);
        document.querySelectorAll<HTMLDetailsElement>("details[open]").forEach((d) => (d.open = false));
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // close all on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        document.querySelectorAll<HTMLDetailsElement>("details[open]").forEach((d) => (d.open = false));
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <header
      ref={headerRef}
      className={clsx("header sticky top-0 z-50 bg-bg", shadow && "shadow-[0_6px_14px_rgba(0,0,0,.12)]")}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-crane-news.png"
            alt="Crane News"
            width={65}
            height={36}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          {NAV.map((g) =>
            g.children ? (
              <details
                key={g.label}
                className="group relative"
                onMouseEnter={cancelClose}
                onMouseLeave={(e) => scheduleClose(e.currentTarget as HTMLDetailsElement)}
              >
                <summary
                  className={clsx(
                    "list-none cursor-pointer select-none px-1 py-2 rounded-md outline-none",
                    "hover:text-yellow-300 focus-visible:ring-2 focus-visible:ring-yellow-400/40",
                    pathname.startsWith(g.href) && "text-yellow-400"
                  )}
                  role="button"
                  onClick={(e) => {
                    // keep only one open at a time
                    document
                      .querySelectorAll<HTMLDetailsElement>("nav details[open]")
                      .forEach((d) => d !== (e.currentTarget as any).parentElement && (d.open = false));
                  }}
                >
                  {g.label}
                </summary>

                <div
                  role="menu"
                  // small mt to reduce flicker gap between summary and panel
                  className="absolute left-0 mt-0.5 w-56 rounded-lg border border-white/10 bg-[rgba(15,17,21,0.95)] text-white backdrop-blur-sm py-2 shadow-lg"
                  onMouseEnter={cancelClose}
                  onMouseLeave={(e) => {
                    const details = (e.currentTarget as HTMLDivElement).closest("details") as HTMLDetailsElement | null;
                    if (details) scheduleClose(details);
                  }}
                >
                  {g.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      role="menuitem"
                      className={clsx(
                        "block px-3 py-2 rounded-md mx-1 text-white/90 hover:bg-white/10",
                        pathname === c.href && "bg-white/10"
                      )}
                      onClick={() => {
                        // close all dropdowns after navigating
                        document.querySelectorAll<HTMLDetailsElement>("nav details[open]").forEach((d) => (d.open = false));
                      }}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link
                key={g.href}
                href={g.href}
                className={clsx(
                  "px-1 py-2 rounded-md hover:text-yellow-300",
                  pathname.startsWith(g.href) && "text-yellow-400"
                )}
              >
                {g.label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden btn-plain text-white/90 border-white/30 bg-white/10 hover:bg-white/20"
          onClick={() => setOpenMobile((v) => !v)}
          aria-expanded={openMobile}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
        >
          Menu
        </button>
      </div>

      {/* Mobile accordion */}
      <div
        id="mobile-nav"
        className={clsx(
          "md:hidden border-t border-white/15 bg-bg/95 backdrop-blur-sm transition-[max-height] overflow-hidden",
          openMobile ? "max-h-[90vh]" : "max-h-0"
        )}
      >
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-2">
          {NAV.map((g) =>
            g.children ? (
              <details key={g.label} className="border-b border-white/10 py-1">
                <summary className="list-none cursor-pointer py-3 px-1 font-medium">
                  {g.label}
                </summary>
                <div className="pb-2">
                  {g.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={() => setOpenMobile(false)}
                      className={clsx(
                        "block py-2 pl-4 pr-2 rounded-md hover:bg-white/10 text-white/90",
                        pathname === c.href && "bg-white/10"
                      )}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link
                key={g.href}
                href={g.href}
                onClick={() => setOpenMobile(false)}
                className={clsx(
                  "block py-3 px-1 border-b border-white/10",
                  pathname.startsWith(g.href) && "text-yellow-400"
                )}
              >
                {g.label}
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}
