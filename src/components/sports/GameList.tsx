"use client";

import React, { useState } from "react";
import type { Game } from "@/data/sports";

function fmt(dt: string) {
  const d = new Date(dt);
  return d.toLocaleString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function GameRow({ g }: { g: Game }) {
  const badge = g.level === "HS" ? "HS" : "JH";
  const where = g.home ? "Home" : "Away";
  const opponent = g.opponent;
  const status =
    g.status === "Final" && g.score
      ? `Final · ${g.home ? "Crane" : opponent} ${g.score.home}–${g.score.away} ${
          g.home ? `vs ${opponent}` : ""
        }`
      : g.status;

  return (
    <div className="card p-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="tag tag--gold">{badge}</span>
        <div>
          <div className="font-semibold">{g.sport}</div>
          <div className="text-xs text-[var(--color-muted)]">
            {fmt(g.date)} · {where}{g.venue ? ` · ${g.venue}` : ""}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm">{g.home ? `Crane vs ${opponent}` : `Crane @ ${opponent}`}</div>
        <div className="text-xs text-[var(--color-muted)]">{status}</div>
      </div>
    </div>
  );
}

export default function GameList({
  title,
  items,
  initial,
}: {
  title: string;
  items: Game[];
  initial: number;
}) {
  const [limit, setLimit] = useState(initial);
  const shown = items.slice(0, limit);
  const remaining = Math.max(items.length - limit, 0);

  // Hide controls if there aren't more than `initial` items
  const controlsNeeded = items.length > initial;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="h-serif text-xl">{title}</div>

        {controlsNeeded && (
          <div className="flex items-center gap-3">
            {remaining > 0 && (
              <button
                onClick={() => setLimit(items.length)}
                className="text-sm text-cyan-600 hover:underline"
              >
                Show {remaining} more
              </button>
            )}
            {limit > initial && (
              <button
                onClick={() => setLimit(initial)}
                className="text-sm text-cyan-600 hover:underline"
              >
                Show less
              </button>
            )}
          </div>
        )}
      </div>

      {shown.length ? (
        shown.map((g) => <GameRow key={g.id} g={g} />)
      ) : (
        <div className="panel p-3 text-sm">Nothing to show yet.</div>
      )}
    </section>
  );
}
