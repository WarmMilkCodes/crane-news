"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";

const links = [
  { href: "/news", label: "News" },
  { href: "/events", label: "Events" },
  { href: "/media", label: "Media" },
  { href: "/resources", label: "Local Resources" },
  { href: "/community", label: "Community" },
  { href: "/sports", label: "Sports" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [shadow, setShadow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShadow(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={clsx("header sticky top-0 z-50", shadow && "shadow-[0_6px_14px_rgba(0,0,0,.12)]")}>
      <div className="mx-auto max-w-6xl px-4 md:px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo-crane-news.png"
            alt="" 
            width={75} 
            height={40} 
            className="object-contain" 
            priority 
          />
         
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map(l => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
          <Link href="/about" className="btn-primary">Subscribe</Link>
        </nav>

        {/* Mobile */}
        <button className="md:hidden btn-plain text-white/90 border-white/30 bg-white/10 hover:bg-white/20"
          onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
          Menu
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/20">
          <div className="mx-auto max-w-6xl px-4 md:px-6 py-3 space-y-2">
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-1">{l.label}</Link>
            ))}
            <Link href="/about" onClick={() => setOpen(false)} className="btn-primary inline-flex">Subscribe</Link>
          </div>
        </div>
      )}
    </header>
  );
}
