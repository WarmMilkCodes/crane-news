import HeroHeader from "@/components/HeroHeader";
import { AlertBar } from "@/components/AlertBar";
import { getLatest } from "@/data/posts";
import { PostCard } from "@/components/PostCard";
import WeatherWidget from "@/components/WeatherWidget";

export default function Home() {
  const latest = getLatest(6);
  const [feature, ...rest] = latest;

  return (
    <div className="space-y-6">
      {/* Feature hero */}
      <HeroHeader
        title="Crane.news"
        subtitle="Local news, events, and media for Crane, Missouri."
        image="/header.jpg"
      />

      {/* Main content: feed + sidebar */}
      <div className="grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-4">
          <AlertBar variant="gold" text="This is a community-run site. Not affiliated with the City of Crane." />
          <h2 className="h-serif text-xl mt-2">Latest</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {feature && <PostCard {...feature} />}
            {rest.map(p => <PostCard key={p.slug} {...p} />)}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="panel p-4">
            <div className="h-serif text-lg">This Week in Crane</div>
            <ul className="mt-2 text-sm space-y-2">
              <li>Crane Schools Open House — Thur 4:30 PM - 6:30 PM</li>
              <li>Last Day for Crane Public Pool - Sun 12:00 PM - 5:00 PM</li>
            </ul>
          </div>
          <div className="panel p-4">
            <div className="h-serif text-lg">Weather</div>
            <WeatherWidget />
          </div>
          <div className="panel p-4">
            <div className="h-serif text-lg">Post an update</div>
            <p className="text-sm text-[var(--color-muted)] mt-1">Share a quick note, photo, or event.</p>
            <a className="btn-primary mt-3 inline-flex" href="/">Coming soon</a>
          </div>
        </aside>
      </div>
    </div>
  );
}
