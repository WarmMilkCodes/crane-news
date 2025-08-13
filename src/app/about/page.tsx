export const metadata = {
  title: "About — Crane.news",
  description: "Who we are, what we cover, and how to get in touch with Crane.news.",
};

export default function AboutPage() {
  return (
    <section className="card p-6 md:p-8 space-y-6">
      <header>
        <h1 className="h-serif text-2xl">About Crane.news</h1>
        <p className="text-[var(--color-muted)] mt-2">
          Independent local updates for Crane, Missouri — news, events, and media.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-4">
        <div className="panel p-4">
          <h2 className="h-serif text-lg">Our mission</h2>
          <p className="text-sm mt-2">
            Keep Crane informed with timely, practical information: what’s happening, what’s changing,
            and what matters this week. Simple, accurate, and free.
          </p>
        </div>
        <div className="panel p-4">
          <h2 className="h-serif text-lg">What we cover</h2>
          <ul className="text-sm mt-2 list-disc pl-5 space-y-1">
            <li>City notices, public works, utilities</li>
            <li>School updates & events</li>
            <li>Community events, sports, and local business</li>
            <li>Weather and road impacts</li>
          </ul>
        </div>
      </section>

      <section className="panel p-4">
        <h2 className="h-serif text-lg">How we source</h2>
        <p className="text-sm mt-2">
          We gather updates from official channels (city, schools, county, MoDOT, NWS), public meetings,
          and direct submissions from residents. When possible, we link to the original source at the end
          of each post.
        </p>
      </section>

      <section className="panel p-4">
        <h2 className="h-serif text-lg">Corrections & updates</h2>
        <p className="text-sm mt-2">
          See something off? We’ll fix it. Email{" "}
          <a href="mailto:support@crane.news" className="underline">support@crane.news</a>{" "}
          with the post link and the correction. Time-sensitive items (road closures, advisories) are prioritized.
        </p>
      </section>

      <section className="panel p-4">
        <h2 className="h-serif text-lg">Contribute</h2>
        <ul className="text-sm mt-2 list-disc pl-5 space-y-1">
          <li>
            <a href="/submit" className="underline">Submit news, events, or photos</a> — include dates, times, locations, and a contact.
          </li>
          <li>
            Subscribe to updates via{" "}
            <a href="/rss.xml" className="underline">RSS</a>. Newsletter coming soon.
          </li>
          <li>
            Media tips: short video clips or photos (landscape preferred) are welcome.
          </li>
        </ul>
      </section>

      <footer className="text-sm text-[var(--color-muted)]">
        <p>Crane.news is an independent community site. For city services, contact City Hall directly.</p>
      </footer>
    </section>
  );
}
