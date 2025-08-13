"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";

const links = [
  { href: "/news", label: "News" },
  { href: "/events", label: "Events" },
  { href: "/media", label: "Media" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={clsx(
      "sticky top-0 z-50 bg-[var(--color-surface)]/95 backdrop-blur border-b border-[var(--color-outline)] transition-shadow",
      scrolled && "shadow-[0_4px_12px_rgba(17,24,39,.06)]"
    )}>
      <div className="mx-auto max-w-6xl px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <Image src="/logo-crane-news.png" alt="Crane.news" width={28} height={28} className="rounded-md object-contain" />
          <span className="text-[var(--color-accent)]">Crane.news</span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm">
          {links.map(l => <Link key={l.href} href={l.href} className="text-[var(--color-muted)] hover:text-[var(--color-text)]">{l.label}</Link>)}
        </nav>
        <a href="/about" className="btn-gold hidden md:inline-flex">Subscribe</a>
      </div>
    </header>
  );
}
