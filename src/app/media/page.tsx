// src/app/media/page.tsx (server)
import { media } from "@/data/media";
import MediaClient from "./Client";

export const metadata = {
  title: "Media — Crane.news",
  description: "A curated selection of public-domain movies, shorts, and series.",
};

export default function MediaPage() {
  return (
    <section className="space-y-4">
      <h1 className="h-serif text-2xl">Media</h1>

      <div className="panel p-4 bg-[var(--color-surface2)] border-l-4 border-[var(--color-accent)]">
        <div className="font-semibold text-lg">Coming Soon: Live TV-Style Broadcast</div>
        <p className="text-sm text-[var(--color-muted)] mt-1">
          We’re working on a continuous, scheduled live channel with local news, events,
          and curated classics. Stay tuned — and enjoy our on-demand library.
        </p>
      </div>

      <p className="text-sm text-[var(--color-muted)]">
        Public-domain films and shorts, plus series with verified PD episodes.
        Sources include Internet Archive, Library of Congress, and NASA.
      </p>

      {/* Client-side grid with hide-mature toggle */}
      <MediaClient items={media} />

      <div className="panel p-3 text-xs text-[var(--color-muted)]">
        Note: We list works believed PD in the U.S. or U.S. government works.
        If you are a rights holder with concerns, contact us for review.
      </div>
    </section>
  );
}
