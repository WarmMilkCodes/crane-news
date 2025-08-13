export const metadata = { title: "Media — Crane.news" };

export default function MediaPage() {
  return (
    <section className="space-y-4">
      <h1 className="h-serif text-2xl">Media</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="tag tag--gold">Podcast</div>
          <h3 className="h-serif text-xl mt-1">Episode 1 — Why Crane.news</h3>
          <p className="text-sm text-[var(--color-muted)]">8 min</p>
          <div className="mt-3 panel p-4 text-sm">Player coming soon.</div>
        </div>
        <div className="card p-4">
          <div className="tag tag--gold">Video</div>
          <h3 className="h-serif text-xl mt-1">Downtown Walkthrough</h3>
          <p className="text-sm text-[var(--color-muted)]">3 min</p>
          <div className="mt-3 panel p-4 text-sm">Video embed coming soon.</div>
        </div>
      </div>
    </section>
  );
}
