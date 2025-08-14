import { media } from "@/data/media";

export const metadata = {
  title: "Media — Crane.news",
  description: "A curated selection of public-domain movies and shorts.",
};

export default function MediaPage() {
  return (
    <section className="space-y-4">
      <h1 className="h-serif text-2xl">Media</h1>

      <div className="panel p-4 bg-[var(--color-surface2)] border-l-4 border-[var(--color-accent)]">
        <div className="font-semibold text-lg">Coming Soon: Live TV-Style Broadcast</div>
        <p className="text-sm text-[var(--color-muted)] mt-1">
          We’re working on adding a continuous, scheduled live channel with local
          news, events, and curated classic programming — just like a real TV
          station. Stay tuned for the launch and in the meantime enjoy our on-demand videos.
        </p>
      </div>

      <p className="text-sm text-[var(--color-muted)]">
        Public-domain films and shorts, streamed for the community. Sources include Internet Archive, Library of Congress, and NASA.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {media.map((m) => (
          <a key={m.id} href={`/media/watch/${m.id}`} className="card p-0 overflow-hidden block">
            <div className="aspect-video bg-[var(--panel)] relative">
              {m.poster ? (
                <img src={m.poster} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full grid place-items-center text-sm text-[var(--color-muted)]">
                  {m.title}
                </div>
              )}
            </div>
            <div className="p-3">
              <div className="font-semibold">{m.title}</div>
              <div className="text-xs text-[var(--color-muted)]">
                {m.year ? `${m.year} • ` : ""}{m.kind} • {m.source}
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="panel p-3 text-xs text-[var(--color-muted)]">
        Note: We curate works believed to be in the U.S. public domain or U.S. government works. If you are a rights holder and have a concern, contact us for review.
      </div>
    </section>
  );
}
