export const metadata = { title: "About — Crane.news" };

export default function AboutPage() {
  return (
    <section className="card p-6 md:p-8">
      <h1 className="h-serif text-2xl">About Crane.news</h1>
      <p className="text-[var(--color-muted)] mt-2">
        Independent local updates for Crane, Missouri — news, events, and media. Not affiliated with the City of Crane.
      </p>

      <div className="panel p-4 mt-4 text-sm">
        Coming soon: community accounts, quick posts with photos, likes & comments, and a weekly newsletter.
      </div>

      <p className="mt-4">
        Send tips or events to <a href="mailto:hello@crane.news" className="underline">hello@crane.news</a>.
      </p>
    </section>
  );
}
