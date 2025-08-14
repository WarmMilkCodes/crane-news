// src/app/media/series/[id]/series-client.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Series } from "@/data/media";

export default function SeriesClient({ series }: { series: Series }) {
  const [hideMature, setHideMature] = useState(true);

  useEffect(() => {
    const v = localStorage.getItem(`series_hide_mature_${series.id}`);
    if (v != null) setHideMature(v === "1");
  }, [series.id]);
  useEffect(() => {
    localStorage.setItem(`series_hide_mature_${series.id}`, hideMature ? "1" : "0");
  }, [hideMature, series.id]);

  const eps = useMemo(() => {
    const list = [...series.episodes].sort((a, b) =>
      (a.season ?? 0) - (b.season ?? 0) || (a.episode ?? 0) - (b.episode ?? 0)
    );
    return hideMature ? list.filter(e => !(e.mature ?? series.mature)) : list;
  }, [series, hideMature]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={hideMature}
            onChange={(e) => setHideMature(e.target.checked)}
            className="accent-[var(--color-accent)]"
          />
          <span className="text-[var(--color-muted)]">Hide mature episodes</span>
        </label>
        <div className="text-xs text-[var(--color-muted)]">
          {eps.length} of {series.episodes.length} episodes
        </div>
      </div>

      <ul className="space-y-2">
        {eps.map((e) => {
          const label = [
            e.season != null ? `S${e.season}` : null,
            e.episode != null ? `E${e.episode}` : null,
            e.year ?? null
          ].filter(Boolean).join(" • ");
          return (
            <li key={e.id} className="card p-3 flex items-center justify-between gap-3">
              <div>
                <div className="font-medium">{e.title}</div>
                <div className="text-xs text-[var(--color-muted)]">{label || "Episode"}</div>
                {e.notes && <div className="text-xs text-[var(--color-muted)] mt-1">{e.notes}</div>}
              </div>
              <div className="flex items-center gap-2">
                {(e.mature ?? series.mature) && (
                  <span className="tag tag--gold bg-red-600 text-white">Mature</span>
                )}
                <Link
                  href={`/media/series/${series.id}/watch/${e.id}`}
                  className="btn-primary px-3 py-1 text-sm"
                >
                  Watch
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
