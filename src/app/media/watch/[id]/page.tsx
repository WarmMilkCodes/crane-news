import { media } from "@/data/media";
import Player from "./player";

export function generateStaticParams() {
  return media.map(m => ({ id: m.id }));
}

export default function WatchPage({ params }: { params: { id: string } }) {
  const item = media.find(m => m.id === params.id);
  if (!item) return <div className="panel p-4">Not found.</div>;

  return (
    <section className="space-y-3">
      <h1 className="h-serif text-2xl">{item.title}</h1>
      <div className="text-sm text-[var(--color-muted)]">
        {item.year ? `${item.year} • ` : ""}{item.kind} • Source: {item.source}
      </div>
      <Player src={item.url} captions={item.captions} />
      {item.notes && <p className="text-xs text-[var(--color-muted)]">{item.notes}</p>}
    </section>
  );
}
