import { notFound } from "next/navigation";
import { posts, getPost } from "@/data/posts";
import Link from "next/link";

export async function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getPost(params.slug); if (!p) return {};
  return {
    title: `${p.title} — Crane.news`,
    description: p.summary,
    openGraph: { title: p.title, description: p.summary, images: ["/header.jpg"] }
  };
}

export default function Article({ params }: { params: { slug: string } }) {
  const p = getPost(params.slug);
  if (!p) return notFound();

  return (
    <article className="card p-6 md:p-8">
      <Link href="/news" className="btn-plain mb-4 inline-flex">← Back to News</Link>
      <div className="flex items-center justify-between text-xs text-[var(--color-muted)]">
        <span className="tag tag--gold">News</span>
        <span>{new Date(p.date).toLocaleDateString()}</span>
      </div>
      <h1 className="h-serif text-3xl mt-2">{p.title}</h1>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={"/header.jpg"} alt="" className="w-full rounded-[var(--radius)] mt-4" />

      <div className="prose mt-4">
        {p.body.map((para, i) => <p key={i}>{para}</p>)}
      </div>

      <div className="mt-6 text-sm text-[var(--color-muted)]">❤️ 12 • 💬 3 (interactions coming soon)</div>
    </article>
  );
}
