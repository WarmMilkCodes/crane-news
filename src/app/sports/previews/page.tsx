// src/app/sports/previews/page.tsx
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Pirate Preview — Crane Sports",
  description:
    "Crane.News Pirate Preview: friendly, community-focused season outlooks for Crane Pirates athletics.",
};

type Preview = {
  slug: string; // /sports/previews/[slug]
  title: string;
  excerpt: string;
  sport:
    | "softball"
    | "volleyball"
    | "football"
    | "xc"
    | "basketball"
    | "baseball"
    | "track"
    | "golf"
    | "tennis"
    | "soccer"
    | "cheer"
    | "other";
  season: "Fall" | "Winter" | "Spring";
  year: number;
  date: string; // ISO publish date
  coverImage?: string;
};

const PREVIEWS: Preview[] = [
  {
    slug: "25-26-spring-softball",
    title: "Pirate Preview: 25-26 Spring Softball",
    excerpt:
      "The Lady Pirates blend experience and new energy for an exciting fall on the diamond — key dates and what to expect.",
    sport: "softball",
    season: "Spring",
    year: 2025,
    date: "2025-08-14",
    coverImage: "/pirates-softball.jpg",
  },
];

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

function qs(params: Record<string, string | undefined>, overrides: Record<string, string | undefined>) {
  const next = { ...params, ...overrides };
  const search = new URLSearchParams();
  Object.entries(next).forEach(([k, v]) => {
    if (v && v.length) search.set(k, v);
  });
  const s = search.toString();
  return s ? `?${s}` : "";
}

export default function PreviewsIndex({
  searchParams,
}: {
  searchParams?: { sport?: string; season?: string; year?: string };
}) {
  const params = {
    sport: searchParams?.sport,
    season: searchParams?.season,
    year: searchParams?.year,
  };

  // derived facets
  const sports = uniq(PREVIEWS.map((p) => p.sport)).sort();
  const seasons = uniq(PREVIEWS.map((p) => p.season)).sort();
  const years = uniq(PREVIEWS.map((p) => p.year))
    .sort((a, b) => b - a)
    .map(String);

  // filter + sort newest first
  const items = PREVIEWS.filter((p) => {
    if (params.sport && p.sport !== params.sport) return false;
    if (params.season && p.season !== params.season) return false;
    if (params.year && String(p.year) !== params.year) return false;
    return true;
  }).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6 py-8 md:py-10 space-y-8">
      {/* Header band */}
      <header className="rounded-2xl border border-neutral-200/70 bg-white/70 backdrop-blur-sm p-6 md:p-8 shadow-sm">
        <div className="mb-2">
          <span className="inline-flex items-center rounded-full border border-amber-300/60 bg-amber-100/60 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-amber-800">
            Series
          </span>
        </div>
        <h1 className="font-serif text-2xl md:text-3xl text-neutral-900">Pirate Preview</h1>
        <p className="mt-2 max-w-2xl text-neutral-700">
          Friendly, community-first season outlooks for Crane Pirates athletics. Browse the latest
          previews or filter by sport, season, and year.
        </p>
      </header>

      {/* Filters */}
      <section className="space-y-3">
        <div className="flex items-center text-xs uppercase tracking-wide text-neutral-600">
          <span>Filters</span>
          <Link
            href={`/sports/previews${qs(params, { sport: undefined, season: undefined, year: undefined })}`}
            className="ml-auto underline underline-offset-4 text-neutral-700 hover:text-neutral-900"
          >
            Clear all
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {/* Sport */}
          <div className="rounded-xl border border-neutral-200 bg-white p-2.5 md:p-3">
            <div className="text-[11px] uppercase tracking-wide text-neutral-500 mb-1.5">Sport</div>
            <div className="flex flex-wrap gap-2">
              <Pill
                href={`/sports/previews${qs(params, { sport: undefined })}`}
                active={!params.sport}
                label="All"
              />
              {sports.map((s) => (
                <Pill
                  key={s}
                  href={`/sports/previews${qs(params, { sport: s })}`}
                  active={params.sport === s}
                  label={cap(s)}
                />
              ))}
            </div>
          </div>

          {/* Season */}
          <div className="rounded-xl border border-neutral-200 bg-white p-2.5 md:p-3">
            <div className="text-[11px] uppercase tracking-wide text-neutral-500 mb-1.5">Season</div>
            <div className="flex flex-wrap gap-2">
              <Pill
                href={`/sports/previews${qs(params, { season: undefined })}`}
                active={!params.season}
                label="All"
              />
              {seasons.map((s) => (
                <Pill
                  key={s}
                  href={`/sports/previews${qs(params, { season: s })}`}
                  active={params.season === s}
                  label={s}
                />
              ))}
            </div>
          </div>

          {/* Year */}
          <div className="rounded-xl border border-neutral-200 bg-white p-2.5 md:p-3">
            <div className="text-[11px] uppercase tracking-wide text-neutral-500 mb-1.5">Year</div>
            <div className="flex flex-wrap gap-2">
              <Pill
                href={`/sports/previews${qs(params, { year: undefined })}`}
                active={!params.year}
                label="All"
              />
              {years.map((y) => (
                <Pill
                  key={y}
                  href={`/sports/previews${qs(params, { year: y })}`}
                  active={params.year === y}
                  label={y}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="space-y-4">
        <div className="flex items-center justify-between text-sm text-neutral-700">
          <span>
            Showing <span className="font-semibold text-neutral-900">{items.length}</span>{" "}
            {items.length === 1 ? "preview" : "previews"}
          </span>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-neutral-700">
            No previews match those filters yet. Try clearing filters or check back soon.
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/sports/previews/${p.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative aspect-[16/9] w-full bg-neutral-100">
                    <Image
                      src={p.coverImage || "/images/sports/placeholder-1600x900.jpg"}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wide text-neutral-600">
                      <span className="rounded-md border border-neutral-300 px-1.5 py-0.5">{p.season}</span>
                      <span>{cap(p.sport)}</span>
                      <span>•</span>
                      <span>{p.year}</span>
                    </div>

                    <h3 className="text-neutral-900 text-base font-semibold leading-snug">
                      {p.title}
                    </h3>

                    <p className="text-neutral-700 text-sm line-clamp-3">{p.excerpt}</p>

                    <div className="pt-1">
                      <span className="text-cyan-700 text-sm group-hover:underline">Read preview →</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Pill({ href, active, label }: { href: string; active: boolean; label: string }) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center rounded-full border px-3 py-1.5 text-sm",
        active
          ? "border-neutral-300 bg-neutral-100 text-neutral-900"
          : "border-neutral-200 text-neutral-700 hover:bg-neutral-50",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
