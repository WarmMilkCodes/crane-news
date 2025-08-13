import Link from "next/link";

export function PostCard({ slug, title, summary, date }: { slug: string; title: string; summary: string; date: string; }) {
  return (
    <article className="section-alt p-5">
      <h3 className="text-lg font-semibold">
        <Link href={`/news/${slug}`} className="text-[var(--color-accent)] hover:underline">{title}</Link>
      </h3>
      <p className="text-sm text-[var(--color-muted)] mt-1">{summary}</p>
      <div className="text-xs text-[var(--color-muted)] mt-3">{new Date(date).toLocaleDateString()}</div>
    </article>
  );
}
