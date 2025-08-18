// src/app/sports/previews/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Sport =
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

type Season = "Fall" | "Winter" | "Spring";

type PreviewFull = {
  slug: string;
  title: string;
  excerpt: string;
  sport: Sport;
  season: Season;
  year: number; // 2025, etc.
  date: string; // ISO publish date
  coverImage?: string;
  // For now, keep content as JSX. Later you can load MD/MDX instead.
  content: React.ReactNode;
};

// --- TEMP DATA: Replace with your real data source when ready ---
const PREVIEWS: PreviewFull[] = [
  {
    slug: "25-26-fall-baseball",
    title: "Pirate Preview: 25-26 Fall Baseball",
    excerpt:
    "Crane's bats are back for the 2025-2026 fall season, with plenty of offense, rivalry showdowns, and tournament play under second-year head coach Tucker.",
    sport: "baseball",
    season: "Fall",
    year: 2025,
    date: "2025-08-18",
    coverImage: "/crane-baseball.jpg",
    content: (
    <>
      <strong>Looking Back</strong>
      <p>
        The Pirates wrapped up their 2024 fall campaign with a winning record and plenty of high-scoring contests.
        Crane notched statement wins over Billings (10–4), Blue Eye (8–2), and a dramatic road victory at Purdy (8–6).
        Their bats exploded in games like a 21–11 rout of Hurley and a 17–4 pounding of Marion C. Early, showing they
        could pile on runs in a hurry.
      </p>
      <p>
        The team also proved battle-tested in close ones—edging Spokane 7–6 in extra innings and outlasting Galena 5–4
        in the Seymour Wood Bat Tournament. While tough losses to Conway, Purdy, and Spokane in tournament play kept
        them from advancing deeper, the Pirates demonstrated resilience under second-year head coach Tucker, laying a
        foundation for continued growth.
      </p>

      <strong>Looking Ahead</strong>
      <p>
        The 2025–26 fall season opens with back-to-back home dates against Sparta (Sep 1) and Exeter (Sep 2) before
        Crane hits the road at Wheaton (Sep 4), Billings (Sep 9), and Hurley (Sep 11). Galena comes to town on Sep 12
        in a key early-season matchup, followed by the 17th Annual Crane Fall Wood Bat Tournament (Sep 15–20).
      </p>
      <p>
        The late-season stretch includes a trip to Spokane (Sep 29) before a home showdown with Southwest (Sep 30).
        October brings pivotal conference action with Blue Eye on the road (Oct 3), Purdy at home (Oct 6), and the
        regular season finale at Marion C. Early (Oct 7).
      </p>

      <ul>
        <li>
          <strong>Home openers:</strong> Sparta (Sep 1), Exeter (Sep 2)
        </li>
        <li>
          <strong>Marquee rivalry:</strong> Purdy — home (Oct 6)
        </li>
        <li>
          <strong>Closing stretch:</strong> at Spokane (Sep 29), Southwest (Sep 30), at Blue Eye (Oct 3),
          Purdy (Oct 6), at Marion C. Early (Oct 7)
        </li>
      </ul>

      <br />

      <strong>What to Watch</strong>
      <p>
        The Pirates’ offensive firepower remains their calling card. Returning bats who fueled last year’s
        double-digit outbursts will be expected to spark rallies, while the pitching staff looks to tighten up against
        top-tier lineups after allowing big innings in a few tournament losses.
      </p>
      <p>
        Defensively, Crane showed flashes of consistency and late-game grit—two traits that will be vital in one-run
        affairs. Under Coach Tucker’s continued leadership, the Pirates are poised to sharpen fundamentals while still
        playing an aggressive, high-energy brand of baseball.
      </p>

      <strong>How to Support</strong>
      <p>
        Pack the stands at the <em>Crane High School baseball field</em>, especially for rivalry nights and tournament
        play. Pirate players thrive on the energy of their fans—blue and gold in the crowd can make the difference in
        close games. Bring your voice, your glove for foul balls, and your school spirit all season long.
      </p>
    </>
  )
  },
  {
    slug: "25-26-spring-softball",
    title: "Pirate Preview: 25-26 Spring Softball",
    excerpt:
      "The Lady Pirates blend experience and new energy for an exciting fall on the diamond — get the key dates and what to expect.",
    sport: "softball",
    season: "Spring",
    year: 2025,
    date: "2025-08-14",
    coverImage: "/pirates-softball.jpg",
    content: (
      <>
        <strong>Looking Back</strong>
        <p>
          The Lady Pirates closed out last season at 10–9, earning a{" "}
          +28 run differential and a Class 1 District 5 win over Billings before
          exiting to Exeter. They mixed explosive offense—like 20–1 over Hollister and 16–0 over
          Mansfield—with clutch 1-run victories over Reeds Spring and Billings. A five-game win
          streak late in the year gave the team momentum heading into the offseason.
        </p>

        <strong>Looking Ahead</strong>
        <p>
          The 2025–26 schedule will test Crane early and often. The Lady Pirates open on the road at
          Hollister (Mar 19) before returning home to host Pleasant Hope (Mar 23). March also brings a
          trip to Exeter, a Spokane/Mansfield doubleheader, and a visit to Forsyth.
        </p>
        <p>
          April is packed with key matchups—home dates with Purdy, Billings, and Marion C. Early, plus
          the always-competitive Galena Classic. Road challenges include Hurley, Southwest, Sparta,
          Reeds Spring, Fordland, and Verona. Senior Night could prove pivotal with Blue Eye coming to
          town on April 27 before the regular season closes at Verona on May 5.
        </p>

        <ul>
          <li>
            <strong>Home openers:</strong> Pleasant Hope (Mar 23), Spokane/Mansfield (Mar 28)
          </li>
          <li>
            <strong>Marquee rivalry:</strong> Galena Classic (Apr 18) & at Galena (Apr 20)
          </li>
          <li>
            <strong>Closing stretch:</strong> Blue Eye (Apr 27), Marionville (Apr 29), at Fordland
            (May 1), at Verona (May 5)
          </li>
        </ul>
        
        <br />

        <strong>What to Watch</strong>
        <p>
          Returning varsity players bring leadership and familiarity with big-game situations, while
          newcomers look to make an immediate impact. Expect aggressive baserunning, steady infield
          defense, and a lineup capable of manufacturing runs or delivering the long ball. If Crane can
          turn close games into wins, a deep district run is well within reach.
        </p>

        <strong>How to Support</strong>
        <p>
          Pack the stands at the <em>Crane High School softball field</em>, wear your blue and gold,
          and make some noise. The Pirates will feed off that home energy all season long.
        </p>
      </>
    ),
  },
];
// ---------------------------------------------------------------

function getPreviewBySlug(slug: string): PreviewFull | null {
  return PREVIEWS.find((p) => p.slug === slug) ?? null;
}

export async function generateStaticParams() {
  // If you later load from a CMS/FS, return those slugs here.
  return PREVIEWS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params; // <-- await params on Next.js 15
  const item = getPreviewBySlug(slug);
  if (!item) {
    return { title: "Pirate Preview — Not Found" };
  }
  const title = item.title;
  const description = item.excerpt || "Crane.News Pirate Preview";
  const url = `https://crane.news/sports/previews/${item.slug}`;
  const ogImage = item.coverImage || "/images/sports/placeholder-1600x900.jpg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: ogImage }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function PreviewPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params; // <-- await params on Next.js 15
  const item = getPreviewBySlug(slug);
  if (!item) return notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 md:px-6 py-6 md:py-10 space-y-6">
      {/* Breadcrumbs */}
      <nav className="text-black/60 text-sm">
        <Link href="/sports" className="hover:text-blue">
          Sports
        </Link>{" "}
        <span className="mx-1">/</span>
        <Link href="/sports/previews" className="hover:text-blue">
          Pirate Preview
        </Link>{" "}
        <span className="mx-1">/</span>
        <span className="text-blue/80">{item.title}</span>
      </nav>

      {/* Title */}
      <header className="space-y-3">
        <span className="tag tag--gold">Pirate Preview</span>
        <h1 className="h-serif text-2xl md:text-3xl text-blue">{item.title}</h1>

        {/* Meta pills */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wide text-blue/60">
          <span className="rounded-md border border-white/15 px-1.5 py-0.5">{item.season}</span>
          <span>{capitalize(item.sport)}</span>
          <span>•</span>
          <span>{item.year}</span>
          <span>•</span>
          <time dateTime={item.date}>{formatDate(item.date)}</time>
        </div>
      </header>

      {/* Hero */}
      <div className="relative w-full h-56 md:h-72 rounded-lg overflow-hidden border border-white/10 bg-slate-900/40">
        <Image
          src={item.coverImage || "/images/sports/placeholder-1600x900.jpg"}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
      </div>

      {/* Body */}
      <div className="prose max-w-none">{item.content}</div>

      {/* Back link */}
      <div className="pt-2">
        <Link href="/sports/previews" className="text-cyan-700 hover:underline">
          ← Back to Pirate Preview index
        </Link>
      </div>
    </article>
  );
}

// --- small helpers ---
function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatDate(iso: string) {
  // Guard invalid dates
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}
