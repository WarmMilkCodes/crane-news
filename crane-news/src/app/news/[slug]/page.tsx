import { notFound } from "next/navigation";
import { posts, getPost } from "@/data/posts";
import Link from "next/link";
import Image from "next/image";

export async function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getPost(params.slug);
  if (!p) return {};
  const img = p.image ?? "/og-default.jpg";
  return {
    title: `${p.title} — Crane.news`,
    description: p.summary,
    openGraph: { title: p.title, description: p.summary, images: [img], url: `https://crane.news/news/${p.slug}`, type: "article" },
    twitter: { card: "summary_large_image", title: p.title, description: p.summary, images: [img] },
  };
}

function isExternal(href: string) {
  return /^https?:\/\//i.test(href);
}

export default function Article({ params }: { params: { slug: string } }) {
  const p = getPost(params.slug);
  if (!p) return notFound();

  const hero = p.image ?? "/header.jpg";

  return (
    <article className="card p-6 md:p-8">
      <Link href="/news" className="btn-plain mb-4 inline-flex">← Back to News</Link>

      <div className="flex items-center justify-between text-xs text-[var(--color-muted)]">
        <span className="tag tag--gold">{p.category ?? "News"}</span>
        <span>{new Date(p.date).toLocaleDateString()}</span>
      </div>

      <h1 className="h-serif text-3xl mt-2">{p.title}</h1>

      <div className="relative w-full aspect-[16/9] mt-4 rounded-[var(--radius)] overflow-hidden">
        <Image src={hero} alt={p.title} fill className="object-cover" priority />
      </div>

      <div className="prose mt-4">
        {p.body.map((para, i) => <p key={i}>{para}</p>)}
      </div>

      {/* Sources / Official links */}
      {p.links && p.links.length > 0 && (
        <div className="panel p-4 mt-6">
          <div className="h-serif text-lg mb-2">Sources &amp; official links</div>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {p.links.map((l, i) => {
              const label = l.label ?? l.href.replace(/^https?:\/\//, "");
              return isExternal(l.href) ? (
                <li key={i}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="underline">
                    {label}
                  </a>{" "}
                  <span className="text-[var(--color-muted)]">(opens in new tab)</span>
                </li>
              ) : (
                <li key={i}>
                  <Link href={l.href} className="underline">{label}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="mt-6 text-sm text-[var(--color-muted)]">
        ❤️ {p.likes ?? 0} • 💬 {p.comments ?? 0} (interactions coming soon)
      </div>
    </article>
  );
}
