"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { MediaItem } from "@/data/media";

export default function MediaClient({ items }: { items: MediaItem[] }) {
  const [hideMature, setHideMature] = useState(true);

  // Load preference once
  useEffect(() => {
    try {
      const v = localStorage.getItem("media_hide_mature");
      if (v != null) setHideMature(v === "1");
    } catch {}
  }, []);

  // Persist preference
  useEffect(() => {
    try {
      localStorage.setItem("media_hide_mature", hideMature ? "1" : "0");
    } catch {}
  }, [hideMature]);

  const filtered = useMemo(
    () => (hideMature ? items.filter((m) => !m.mature) : items),
    [items, hideMature]
  );

  return (
    <>
      {/* Toggle row */}
      <div className="flex items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={hideMature}
            onChange={(e) => setHideMature(e.target.checked)}
            className="accent-[var(--color-accent)]"
          />
          <span className="text-[var(--color-muted)]">Hide mature content</span>
        </label>
        <div className="text-xs text-[var(--color-muted)]">
          Showing {filtered.length} of {items.length}
        </div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((m) => (
          <a
            key={m.id}
            href={`/media/watch/${m.id}`}
            className="
              card p-0 overflow-hidden block group relative
              transition-all duration-200 ease-out
              shadow-md hover:shadow-2xl
              hover:-translate-y-0.5 hover:scale-[1.02]
              will-change-transform transform-gpu
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]
            "
          >
            <div className="relative w-full aspect-[2/3] bg-[var(--panel)]">
              {m.poster ? (
                <Image
                  src={m.poster}
                  alt={m.title}
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-sm text-[var(--color-muted)]">
                  {m.title}
                </div>
              )}

              {/* Mature badge */}
              {m.mature && (
                <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-semibold px-2 py-1 rounded shadow-lg">
                  Mature
                </span>
              )}

              {/* Accent glow on hover */}
              <div className="pointer-events-none absolute inset-0 ring-0 ring-[var(--color-accent)]/40 rounded transition-all duration-200 group-hover:ring-[3px]" />

              {/* Fade overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-95 transition-opacity duration-200 group-hover:opacity-100" />

              {/* Title/meta */}
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-0 group-hover:translate-y-[-2px] transition-transform duration-200">
                <div className="font-semibold text-white drop-shadow-md line-clamp-2">
                  {m.title}
                </div>
                <div className="text-xs text-white/80">
                  {m.year ? `${m.year} • ` : ""}
                  {m.kind} • {m.source}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
