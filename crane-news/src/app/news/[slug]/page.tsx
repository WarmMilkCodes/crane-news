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
  };
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

      {/* Post hero image = same as listing image */}
      <div className="relative w-full aspect-[16/9] mt-4 rounded-[var(--radius)] overflow-hidden">
        <Image src={hero} alt={p.title} fill className="object-cover" priority />
      </div>

      <div className="prose mt-4">
        {p.body.map((para, i) => <p key={i}>{para}</p>)}
      </div>

      <div className="mt-6 text-sm text-[var(--color-muted)]">
        ❤️ {p.likes ?? 0} • 💬 {p.comments ?? 0} (interactions coming soon)
      </div>
    </article>
  );
}
