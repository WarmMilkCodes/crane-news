import { media, type Series } from "@/data/media";
import SeriesClient from "./series-client";

export function generateStaticParams() {
  return media
    .filter((m): m is Series => m.kind === "Series")
    .map((s) => ({ id: s.id }));
}

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ await the promise
  const series = media.find(
    (m): m is Series => m.kind === "Series" && m.id === id
  );

  if (!series) return <div className="panel p-4">Not found.</div>;

  return (
    <section className="space-y-4">
      <h1 className="h-serif text-2xl">{series.title}</h1>
      <div className="text-sm text-[var(--color-muted)]">
        {series.year ? `${series.year} • ` : ""}Series • Source: {series.source}
      </div>
      {series.notes && (
        <div className="text-xs text-[var(--color-muted)]">{series.notes}</div>
      )}

      <SeriesClient series={series} />
    </section>
  );
}
