import HeroHeader from "@/components/HeroHeader";
import { getLatest } from "@/data/posts";
import { PostCard } from "@/components/PostCard";
import WeatherWidget from "@/components/WeatherWidget";
import SevereWeatherAlert from "@/components/SevereWeatherAlert";
import { getEventsThisWeek } from "@/data/events";

export default function Home() {
  const latest = getLatest(6);
  const [feature, ...rest] = latest;

  const weekEvents = getEventsThisWeek({ startOn: "sun", limit: 5 });

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
          <SevereWeatherAlert />

          <h2 className="h-serif text-xl mt-2">Latest</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {feature && <PostCard {...feature} />}
            {rest.map(p => <PostCard key={p.slug} {...p} />)}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="panel p-4">
            <div className="h-serif text-lg">This Week in Crane</div>
            {weekEvents.length === 0 ? (
              <p className="text-sm text-[var(--color-muted)] mt-2">No events this week yet.</p>
            ) : (
              <ul className="mt-2 text-sm space-y-2">
                {weekEvents.map(e => (
                  <li key={e.id} className="flex flex-col">
                    <span className="font-medium">{e.title}</span>
                    <span className="text-[var(--color-muted)]">
                      {new Date(e.when).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}
                      {e.location ? ` • ${e.location}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        
          <WeatherWidget />
          <div className="panel p-4">
            <div className="h-serif text-lg">Post an update</div>
            <p className="text-sm text-[var(--color-muted)] mt-1">Share a quick note, photo, or event.</p>
            <a className="btn-primary mt-3 inline-flex" href="/submit">Submit</a>
          </div>
        </aside>
      </div>
    </div>
  );
}
