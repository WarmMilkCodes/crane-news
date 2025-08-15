import Link from "next/link";

type CardProps = {
  slug: string;
  title: string;
  summary: string;
  date: string;         // ISO
  image?: string;
  category?: string;
  likes?: number;
  comments?: number;
};

export function PostCard({
  slug, title, summary, date, image = "/header.jpg",
  category = "News", likes = 0, comments = 0
}: CardProps) {
  return (
    <article className="bg-white rounded-[var(--radius)] border border-[var(--color-outline)] overflow-hidden hover:shadow-md transition">
      <div className="aspect-[16/9] w-full bg-[var(--color-surface-2)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between text-xs text-[var(--color-muted)]">
          <span className="tag tag--gold">{category}</span>
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>
        <h3 className="h-serif text-lg mt-2 leading-snug">
          <Link href={`/news/${slug}`} className="hover:underline">{title}</Link>
        </h3>
        <p className="text-sm text-[var(--color-muted)] mt-1">{summary}</p>
        <div className="flex items-center justify-between text-xs text-[var(--color-muted)] mt-3">
          <Link href={`/news/${slug}`} className="btn-plain">Read</Link>
        </div>
      </div>
    </article>
  );
}
