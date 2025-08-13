import { notFound } from "next/navigation";
import { getPost, posts } from "@/data/posts";
import Link from "next/link";

export async function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }));
}

export default function Article({ params }: { params: { slug: string } }) {
  const p = getPost(params.slug);
  if (!p) return notFound();

  return (
    <article className="card p-6 md:p-8 prose max-w-none">
      <Link href="/news" className="btn mb-4">← Back to News</Link>
      <h1 className="text-2xl md:text-3xl font-semibold">{p.title}</h1>
      <div className="text-sm text-[var(--color-muted)] mt-1">{new Date(p.date).toLocaleDateString()}</div>
      <div className="mt-4 space-y-4 text-[var(--color-text)]">
        {p.body.map((para, i) => <p key={i}>{para}</p>)}
      </div>
    </article>
  );
}
