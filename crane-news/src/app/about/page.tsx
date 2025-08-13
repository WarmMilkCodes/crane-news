export const metadata = { title: "About — Crane.news" };

export default function AboutPage() {
  return (
    <section className="card p-6 md:p-8">
      <h1 className="text-xl md:text-2xl font-semibold">About Crane.news</h1>
      <p className="text-[var(--color-muted)] mt-2">
        Independent, local updates for Crane, Missouri — news, events, and media. Not affiliated with the City of Crane.
      </p>
      <p className="mt-4">
        Send tips or events to <a href="mailto:hello@crane.news" className="text-[var(--color-accent)] hover:underline">hello@crane.news</a>.
      </p>
    </section>
  );
}
