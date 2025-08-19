// src/app/history/page.tsx
import Image from "next/image";
import Link from "next/link";
import { getHistory } from "@/data/history";

export const metadata = {
  title: "This Week in Crane History — Crane.news",
  description:
    "Weekly clippings and highlights from old Crane newspapers and archives.",
};

export default function HistoryIndex() {
  const items = getHistory();

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString([], { dateStyle: "long" });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="h-serif text-3xl mb-2">This Week in Crane History</h1>
      <p className="text-[var(--color-muted)] mb-6">
        Snippets from old local newspapers and archives—lightly summarized for modern readers.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {items.map((h) => (
          <Link key={h.slug} href={`/history/${h.slug}`} className="card p-4 hover:ring-1 hover:ring-black/10">
            {h.image && (
              <div className="relative mb-3 overflow-hidden rounded-[var(--radius)] bg-[var(--panel)]">
                <Image
                  src={h.image}
                  alt={h.title}
                  width={800}
                  height={450}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            <div className="text-xs text-[var(--color-muted)]">{fmt(h.date)}</div>
            <h2 className="font-semibold mt-1">{h.title}</h2>
            <p className="text-sm mt-1 line-clamp-3">
              {h.summary[0]}
            </p>
            <span className="btn-plain mt-3 inline-flex">Read →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
