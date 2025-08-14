import { media, type MediaItem, type Series } from "@/data/media";
import Player from "./player";
import { redirect } from "next/navigation";

export const metadata = { title: "Watch — Crane.news" };

export function generateStaticParams() {
  return media
    // only generate watch pages for items that are not Series
    .filter((m) => m.kind !== "Series")
    .map((m) => ({ id: m.id }));
}

export default async function Watch({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = media.find((m) => m.id === id);

  if (!item) return <div className="panel p-4">Not found.</div>;

  // If it's a Series, send users to the series page instead
  if (item.kind === "Series") {
    redirect(`/media/series/${item.id}`);
  }

  // From here, TypeScript knows `item` is Movie/Short/PSA (has url/captions)
  return (
    <section className="space-y-3">
      <h1 className="h-serif text-2xl">{item.title}</h1>
      <div className="text-sm text-[var(--color-muted)]">
        {item.year ? `${item.year} • ` : ""}
        {item.kind} • Source: {item.source}
      </div>

      {item.mature && (
        <div className="p-3 bg-red-900/40 border border-red-600 rounded text-sm text-red-100">
          ⚠️ This film may contain content not suitable for young viewers.
        </div>
      )}

      <Player src={item.url} captions={item.captions} />

      {item.notes && (
        <p className="text-xs text-[var(--color-muted)]">{item.notes}</p>
      )}
    </section>
  );
}
