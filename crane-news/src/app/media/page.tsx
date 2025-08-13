export const metadata = { title: "Media — Crane.news" };

export default function MediaPage() {
  return (
    <section className="card p-6 md:p-8">
      <h1 className="text-xl md:text-2xl font-semibold">Media</h1>
      <p className="text-[var(--color-muted)] mt-2">Pre-recorded videos and podcast episodes.</p>
      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <div className="section-alt p-4">
          <div className="font-medium">Episode 1 — Why Crane.news</div>
          <div className="text-sm text-[var(--color-muted)] mt-1">Podcast • 8 min</div>
        </div>
        <div className="section-alt p-4">
          <div className="font-medium">Downtown Walkthrough</div>
          <div className="text-sm text-[var(--color-muted)] mt-1">Video • 3 min</div>
        </div>
      </div>
    </section>
  );
}
