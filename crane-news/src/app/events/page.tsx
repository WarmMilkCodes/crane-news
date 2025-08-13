// src/app/events/page.tsx
import { events, getEventsThisWeek } from "@/data/events";

export const metadata = {
  title: "Events — Crane.news",
  description: "Upcoming events and community happenings in Crane, Missouri.",
};

export default function EventsPage() {
  // All upcoming events, sorted by start time
  const allEvents = [...events].sort(
    (a, b) => +new Date(a.when) - +new Date(b.when)
  );

  // Auto “This Week in Crane” (week starts Sunday; change to "mon" if you prefer)
  const thisWeek = getEventsThisWeek({ startOn: "sun" });

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });

  return (
    <div className="space-y-8">
      {thisWeek.length > 0 && (
        <section className="space-y-3">
          <h2 className="h-serif text-xl">This Week in Crane</h2>
          <div className="mt-1 grid gap-4 sm:grid-cols-2">
            {thisWeek.map((e) => (
              <div key={e.id} className="card p-4">
                <h3 className="font-semibold">{e.title}</h3>
                <p className="text-sm text-[var(--color-muted)]">
                  {fmt(e.when)}{e.location ? ` • ${e.location}` : ""}
                </p>
                {e.description && <p className="text-sm mt-2">{e.description}</p>}

                {e.link && (
                  <a
                    href={e.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-plain inline-flex mt-3"
                  >
                    More info →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-3">
        <h2 className="h-serif text-xl">All Upcoming Events</h2>
        <div className="mt-1 grid gap-4 sm:grid-cols-2">
          {allEvents.map((e) => (
            <div key={e.id} className="card p-4">
              <h3 className="font-semibold">{e.title}</h3>
              <p className="text-sm text-[var(--color-muted)]">
                {fmt(e.when)}{e.location ? ` • ${e.location}` : ""}
              </p>
              {e.description && <p className="text-sm mt-2">{e.description}</p>}

              {e.link && (
                <a
                  href={e.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-plain inline-flex mt-3"
                >
                  More info →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
