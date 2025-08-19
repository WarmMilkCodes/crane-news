import HeroHeader from "@/components/HeroHeader";
import { getLatest, getDeathNotices } from "@/data/posts";
import { PostCard } from "@/components/PostCard";
import WeatherWidget from "@/components/WeatherWidget";
import SevereWeatherAlert from "@/components/SevereWeatherAlert";
import { getEventsThisWeek } from "@/data/events";
import { getLatestHistory } from "@/data/history";
import Link from "next/link";

// Small reusable panel for death notices
function DeathNoticesBlock() {
  const items = getDeathNotices(4);
  if (!items.length) return null;

  return (
    <div className="panel p-4">
      <div className="h-serif text-lg">Death Notices</div>
      <ul className="mt-2 space-y-2">
        {items.map((p) => (
          <li key={p.slug} className="text-sm">
            <a href={`/news/${p.slug}`} className="underline hover:no-underline">
              {p.title}
            </a>
            <div className="text-[var(--color-muted)] text-xs">
              {new Date(p.date).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
      <div className="text-xs text-[var(--color-muted)] mt-2">
        Notices are compiled from funeral home postings and family submissions.{" "}
        <a href="/submit" className="underline">Submit a notice</a>.
      </div>
    </div>
  );
}

export default function Home() {
  const latest = getLatest(6);
  const [feature, ...rest] = latest;
  const weekEvents = getEventsThisWeek({ startOn: "sun", limit: 5 });
  const latestHistory = getLatestHistory(1)[0];


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
            {feature ? <PostCard {...feature} /> : null}
            {rest.map((p) => (
              <PostCard key={p.slug} {...p} />
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="panel p-4">
            <div className="h-serif text-lg">This Week in Crane</div>
            {weekEvents.length === 0 ? (
              <p className="text-sm text-[var(--color-muted)] mt-2">
                No events this week yet.
              </p>
            ) : (
              <ul className="mt-2 text-sm space-y-2">
                {weekEvents.map((e) => (
                  <li key={e.id} className="flex flex-col">
                    <span className="font-medium">{e.title}</span>
                    <span className="text-[var(--color-muted)]">
                      {new Date(e.when).toLocaleString([], {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                      {e.location ? ` • ${e.location}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="panel p-4">
          <div className="h-serif text-lg">This Week in Crane History</div>
        
          {!latestHistory ? (
            <>
              <p className="text-sm text-[var(--color-muted)] mt-2">
                Step back in time with headlines and moments from Crane’s past.
              </p>
              <Link href="/history" className="btn-plain inline-flex mt-2">
                Explore History →
              </Link>
            </>
          ) : (
            <Link href="/history" className="block group mt-2">
              {latestHistory.image && (
                <div className="relative overflow-hidden rounded-[var(--radius)] bg-[var(--panel)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={latestHistory.image}
                    alt={latestHistory.title}
                    className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              )}
              <div className="mt-2 text-xs text-[var(--color-muted)]">
                {new Date(latestHistory.date).toLocaleDateString([], { dateStyle: "long" })}
              </div>
              <div className="font-semibold mt-0.5">{latestHistory.title}</div>
              <div className="text-sm mt-1 line-clamp-3">
                {latestHistory.summary?.[0] ?? "Read more from the archives."}
              </div>
              <span className="btn-plain inline-flex mt-2">See more →</span>
            </Link>
          )}
        </div>

          <WeatherWidget />
          <DeathNoticesBlock />

          <div className="panel p-4">
            <div className="h-serif text-lg">Post an update</div>
            <p className="text-sm text-[var(--color-muted)] mt-1">
              Share a quick note, photo, or event.
            </p>
            <a className="btn-primary mt-3 inline-flex" href="/submit">
              Submit
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
