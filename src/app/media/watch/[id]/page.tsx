import { media } from "@/data/media";
import Player from "./player";

export const metadata = {
  title: "Watch — Crane.news",
};

export function generateStaticParams() {
  return media.map((m) => ({ id: m.id }));
}

export default async function Watch({
  params,
}: {
  // In your setup, PageProps['params'] is a Promise — so type it that way:
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ satisfy the Promise type
  const item = media.find((m) => m.id === id);

  if (!item) {
    return <div className="panel p-4">Not found.</div>;
  }

  return (
    <section className="space-y-3">
      <h1 className="h-serif text-2xl">{item.title}</h1>
      <div className="text-sm text-[var(--color-muted)]">
        {item.year ? `${item.year} • ` : ""}
        {item.kind} • Source: {item.source}
      </div>

        {/* Mature Content Warning */}
        {item.mature && (
            <div className="p-3 bg-red-900/40 border border-red-600 rounded text-sm text-red-100">
                This film may contain content not suitable for young viewers.
            </div>
        )}

      <Player src={item.url} captions={item.captions} />
      
      {item.notes && (
        <p className="text-xs text-[var(--color-muted)]">{item.notes}</p>
      )}
    </section>
  );
}
