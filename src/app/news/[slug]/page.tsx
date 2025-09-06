import { notFound } from "next/navigation";
import { posts, getPost } from "@/data/posts";
import Link from "next/link";
import PostNotes from "@/components/PostNotes";
import Markdown from "@/components/Markdown";
import FeatureBanner from "@/components/FeatureBanner";
import GameRecapBox from "@/components/GameRecapBox";
import BroadcastRecap  from "@/components/BroadcastRecap";

type SlugParams = { slug: string };

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

// Next 15: params is async
export async function generateMetadata({
  params,
}: {
  params: Promise<SlugParams>;
}) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  const img = p.image ?? "/og-default.jpg";
  return {
    title: `${p.title} — Crane.news`,
    description: p.summary,
    openGraph: {
      title: p.title,
      description: p.summary,
      images: [img],
      url: `https://crane.news/news/${p.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: p.title,
      description: p.summary,
      images: [img],
    },
    ...(p.updatedAt ? { other: { lastModified: p.updatedAt } } : {}),
  };
}

// Next 15: params is async
export default async function Article({
  params,
}: {
  params: Promise<SlugParams>;
}) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return notFound();

  const hero = p.image ?? "/header.jpg";

  return (
    <article className="card p-6 md:p-8">
      <Link href="/news" className="btn-plain mb-4 inline-flex">
        ← Back to News
      </Link>

      <div className="flex items-center justify-between text-xs text-[var(--color-muted)]">
        <span className="tag tag--gold">{p.category ?? "News"}</span>
        <div className="flex items-center gap-2">
          <span>Published {new Date(p.date).toLocaleDateString()}</span>
          {p.updatedAt && (
            <>
              <span aria-hidden>•</span>
              <span>Updated {new Date(p.updatedAt).toLocaleDateString()}</span>
            </>
          )}
        </div>
      </div>

      <h1 className="h-serif text-3xl mt-2">{p.title}</h1>

      {/* Feature banner */}
      <FeatureBanner
        image={hero}
        title={p.title}
        subtitle={
          p.slug === "crane-football-season-opener-2025"
            ? "75 Years in the Making — Junior High Season Kicks Off"
            : undefined
        }
        tag={p.category ?? "News"}
        attribution={p.attribution}
      />

      {/* Updates / Corrections */}
      <PostNotes post={p} />

      {p.slug === "crane-football-season-opener-2025" && (
        <BroadcastRecap
          home={{
            name: "Crane Pirates",
            short: "CRANE PIRATES",
            shell: "#2d5ca2",
            mask: "#b58825",
            score: 8,
            record: "0–1",
          }}
          away={{
            name: "Lighthouse Christian",
            short: "LIGHTHOUSE CHRISTIAN",
            shell: "#ffffff",
            mask: "#263645",
            score: 48,
            record: "1–0",
          }}
          meta={{
            date: "2025-09-06",
            venue: "Crane • Only home game",
            competition: "Junior High Football",
          }}
          scoring={[
            { t: "Q4 2:10", desc: "CR — Kendrick Bass 6-yd rush (2-pt failed)" },
          ]}
          players={[
            { name: "Kendrick Bass (#26)", line: "1 Rush TD" },
          ]}
        />
)}

      {/* Game recap highlight (only on the football article) */}
      {p.slug === "crane-football-season-opener-2025" && (
        <GameRecapBox
          homeTeam="Crane Pirates"
          awayTeam="Lighthouse Christian"
          homeScore={8}
          awayScore={48}
          highlight="#26 Kendrick Bass • 4th Qtr TD run"
          attendance="500+"
          nextGame={{
            date: "2025-09-09",
            opponent: "Joel E. Barber Buckskins",
            location: "Away",
            time: "5:30 PM",
            venueCity: "Lebanon",
          }}
          note="This was the only home game of the short inaugural season."
          homeHelmet={{
            shell: "#2d5ca2",
            mask: "#b58825",
          }}
          awayHelmet={{
            shell: "#ffffff",
            mask: "#263645"
          }}
        />
      )}

      {/* Body rendered as Markdown */}
      <div className="prose mt-4 max-w-none">
        {p.body.map((para, i) => (
          <Markdown key={i}>{para}</Markdown>
        ))}
      </div>

      {/* Optional links box */}
      {Array.isArray(p.links) && p.links.length > 0 && (
        <div className="panel p-4 mt-6">
          <div className="h-serif text-lg mb-2">Sources &amp; official links</div>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {p.links.map((l, i) => {
              const label = l.label ?? l.href.replace(/^https?:\/\//, "");
              const external = /^https?:\/\//i.test(l.href);
              return external ? (
                <li key={i}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {label}
                  </a>{" "}
                  <span className="text-[var(--color-muted)]">(opens in new tab)</span>
                </li>
              ) : (
                <li key={i}>
                  <Link href={l.href} className="underline">
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </article>
  );
}
