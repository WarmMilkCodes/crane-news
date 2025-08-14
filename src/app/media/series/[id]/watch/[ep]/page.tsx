import { media, type Series } from "@/data/media";
import Player from "@/app/media/watch/[id]/player";

export function generateStaticParams() {
  const params: { id: string; ep: string }[] = [];
  media.forEach((m) => {
    if (m.kind === "Series") {
      m.episodes.forEach((e) => params.push({ id: m.id, ep: e.id }));
    }
  });
  return params;
}

export default async function EpisodeWatch({
  params,
}: {
  params: Promise<{ id: string; ep: string }>;
}) {
  const { id, ep } = await params; // ✅ await the promise

  const series = media.find(
    (m): m is Series => m.kind === "Series" && m.id === id
  );
  if (!series) return <div className="panel p-4">Not found.</div>;

  const episode = series.episodes.find((e) => e.id === ep);
  if (!episode) return <div className="panel p-4">Episode not found.</div>;

  const isMature = (episode.mature ?? series.mature) === true;

  return (
    <section className="space-y-3">
      <h1 className="h-serif text-2xl">{series.title}</h1>
      <div className="text-sm text-[var(--color-muted)]">
        {episode.season ? `S${episode.season}` : ""}
        {episode.season && episode.episode ? " • " : ""}
        {episode.episode ? `E${episode.episode}` : ""}
        {(episode.season || episode.episode) && episode.year ? " • " : ""}
        {episode.year ?? ""}
      </div>

      {isMature && (
        <div className="p-3 bg-red-900/40 border border-red-600 rounded text-sm text-red-100">
          ⚠️ This episode may not be suitable for young viewers.
        </div>
      )}

      <Player src={episode.url} captions={episode.captions} />

      {episode.notes && (
        <p className="text-xs text-[var(--color-muted)]">{episode.notes}</p>
      )}
    </section>
  );
}
