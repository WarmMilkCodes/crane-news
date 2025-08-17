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
