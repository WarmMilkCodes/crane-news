import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getUpcomingGames, getRecentResults, standings, type Game } from "@/data/sports";

const MAX_UPCOMING = 3;
const MAX_RECENT   = 3;

export const metadata = {
  title: "Sports — Crane.news",
  description: "Schedules, scores, and standings for Crane JH & HS athletics.",
};

function fmt(dt: string) {
  const d = new Date(dt);
  return d.toLocaleString([], { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

function GameRow({ g }: { g: Game }) {
  const badge = g.level === "HS" ? "HS" : "JH";
  const where = g.home ? "Home" : "Away";
  const opponent = g.opponent;
  const status =
    g.status === "Final" && g.score
      ? `Final · ${g.home ? "Crane" : opponent} ${g.score.home}–${g.score.away} ${g.home ? `vs ${opponent}` : ""}`
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

/** Client-only mini list with Show more/less (no routes) */
function GameListClient({ title, items, initial }: { title: string; items: Game[]; initial: number }) {
  "use client";
  const [limit, setLimit] = React.useState(initial);
  const shown = items.slice(0, limit);
  const remaining = Math.max(items.length - limit, 0);

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="h-serif text-xl">{title}</div>
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
      </div>

      {shown.length ? shown.map(g => <GameRow key={g.id} g={g} />) : (
        <div className="panel p-3 text-sm">Nothing to show yet.</div>
      )}
    </section>
  );
}

export default function SportsPage() {
  // Grab a reasonable superset; the client list enforces the cap.
  const upcomingAll = getUpcomingGames(20);
  const recentAll   = getRecentResults(20);

  const latestPreviews = [
    {
      slug: "25-26-fall-baseball",
      title: "Pirate Preview: 25-26 Fall Baseball",
      excerpt: "Crane Pirates bats return for fall baseball.",
      coverImage: "/crane-baseball.jpg",
    },
    {
      slug: "25-26-spring-softball",
      title: "Pirate Preview: 25-26 Spring Softball",
      excerpt: "Lady Pirates blend experience and new energy for an exciting spring on the diamond.",
      coverImage: "/pirates-softball.jpg",
    },
  ];

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="h-serif text-2xl">Crane Sports</h1>
        <p className="text-sm text-[var(--color-muted)]">
          Junior High & High School schedules, scores, and standings.
        </p>
        <div className="panel p-3 text-xs text-[var(--color-muted)]">
          Tip? Score correction? <Link href="/submit" className="underline">Send an update</Link>.
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-4">
        <GameListClient title="Upcoming Games" items={upcomingAll} initial={MAX_UPCOMING} />
        <GameListClient title="Recent Results" items={recentAll} initial={MAX_RECENT} />
      </div>

      {/* Previews */}
      <section className="space-y-3">
        <div className="h-serif text-xl">Pirate Preview</div>
        {latestPreviews.length ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {latestPreviews.map((p) => (
              <Link
                key={p.slug}
                href={`/sports/previews/${p.slug}`}
                className="group card overflow-hidden p-0 hover:shadow-md transition"
              >
                <div className="relative aspect-[16/9] w-full bg-[var(--color-muted)]">
                  <Image
                    src={p.coverImage}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <div className="p-3 space-y-1">
                  <h3 className="font-semibold text-sm">{p.title}</h3>
                  <p className="text-xs text-[var(--color-muted)] line-clamp-2">
                    {p.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="panel p-3 text-sm">No previews posted yet.</div>
        )}
      </section>

      <section className="space-y-3">
        <div className="h-serif text-xl">Standings (Unofficial)</div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {standings.map((s, i) => (
            <div key={i} className="card p-3">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{s.sport}</div>
                <span className="tag tag--gold">{s.level}</span>
              </div>
              <div className="mt-1 text-sm">Record: {s.wins}-{s.losses}{s.ties ? `-${s.ties}` : ""}</div>
              {s.notes && <div className="text-xs text-[var(--color-muted)] mt-1">{s.notes}</div>}
            </div>
          ))}
        </div>
        <div className="text-xs text-[var(--color-muted)]">
          Note: Records are compiled from community submissions and may not be official.
        </div>
      </section>
    </section>
  );
}
