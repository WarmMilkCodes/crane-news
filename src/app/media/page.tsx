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
        <a key={m.id} 
        href={`/media/watch/${m.id}`} 
        className="
          card p-0 overflow-hidden block group relative
          transition-all duration-200 ease-out
          shadow-md hover:shadow-2xl
          hover:-translate-y-0.5 hover:scale-[1.02]
          will-change-transform transform-gpu
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]
          "
        >
          <div className="relative w-full aspect-[2/3] bg-[var(--panel)]">
            {m.poster ? (
              <img
                src={m.poster}
                alt={m.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-sm text-[var(--color-muted)]">
                {m.title}
              </div>
            )}

            {/* Mature Badge */}
            {m.mature && (
              <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-semibold px-2 py-1 rounded shadow-lg">
                Mature
              </span>
            )}

            
            <div
              className="
              pointer-events-none absolute inset-0
              ring-0 ring-[var(--color-accent)]/40 rounded
              transition-all duration-200
              group-hover:ring-[3px]
              "
            />

            {/* Fade overlay */}
            <div className="
              pointer-events-none absolute inset-0
              bg-gradient-to-t from-black/90 via-black/40 to-transparent
              opacity-950 transition-opacity duration-200
              group-hover:opacity-100" 
            />

            {/* Title inside fade */}
            <div className="
              absolute bottom-0 left-0 right-0 p-3
              translate-y-0 group-hover:translate-y-[-2px]
              transition-transform duration-200
              "
            >
              <div className="font-semibold text-white drop-shadow-md line-clamp-2">
                {m.title}
              </div>
              <div className="text-xs text-white/80">
                {m.year ? `${m.year} • ` : ""}{m.kind} • {m.source}
              </div>
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
