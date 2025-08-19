// src/app/history/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getHistory, getHistoryItem } from "@/data/history";

type SlugParams = { slug: string };

export async function generateStaticParams() {
  return getHistory().map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: { params: Promise<SlugParams> }) {
  const { slug } = await params;
  const h = getHistoryItem(slug);
  if (!h) return {};
  return {
    title: `${h.title} — This Week in Crane History`,
    description: h.summary[0],
    openGraph: {
      title: h.title,
      description: h.summary[0],
      images: h.image ? [h.image] : ["/og-default.jpg"],
      url: `https://crane.news/history/${h.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: h.title,
      description: h.summary[0],
      images: h.image ? [h.image] : ["/og-default.jpg"],
    },
  };
}

export default async function HistoryArticle({ params }: { params: Promise<SlugParams> }) {
  const { slug } = await params;
  const h = getHistoryItem(slug);
  if (!h) return notFound();

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString([], { dateStyle: "long" });

  return (
    <article className="card p-6 md:p-8">
      <Link href="/history" className="btn-plain mb-4 inline-flex">← Back to History</Link>

      <div className="flex items-center justify-between text-xs text-[var(--color-muted)]">
        <span>{fmt(h.date)}</span>
        {h.publicDomain && <span className="tag tag--gold">Public Domain</span>}
      </div>

      <h1 className="h-serif text-3xl mt-2">{h.title}</h1>

      {h.image && (
        <div className="relative mt-4 bg-[var(--panel)] rounded-[var(--radius)] overflow-hidden">
          <Image
            src={h.image}
            alt={h.title}
            width={1200}
            height={800}
            className="w-full h-auto object-contain"
            priority
          />
          {h.attribution && (
            <span className="absolute bottom-2 right-2 z-10 text-[10px] leading-none text-white/85 bg-black/50 px-2 py-0.5 rounded">
              {h.attribution}
            </span>
          )}
        </div>
      )}

      <div className="prose mt-4">
        {h.summary.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      {(h.links?.length || h.citation) && (
        <div className="panel p-4 mt-6">
          <div className="h-serif text-lg mb-2">Source</div>
          {h.citation && <p className="text-sm">{h.citation}</p>}
          {h.links?.length ? (
            <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
              {h.links.map((l, i) => (
                <li key={i}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {l.label}
                  </a>{" "}
                  <span className="text-[var(--color-muted)]">(opens in new tab)</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )}
    </article>
  );
}
