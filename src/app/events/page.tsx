// src/app/events/page.tsx
import { getEventsThisWeek, getEventsUpcoming } from "@/data/events";

export const metadata = {
  title: "Events — Crane.news",
  description: "Upcoming events and community happenings in Crane, Missouri.",
};

export default function EventsPage() {
  const now = new Date();

  const thisWeek = getEventsThisWeek({ startOn: "sun", fromDate: now });
  const allEvents = getEventsUpcoming(now);

  const fmtRange = (startISO: string, endISO?: string) => {
    const start = new Date(startISO);
    if (!endISO) {
      return start.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
    }
    const end = new Date(endISO);

    const sameDay =
      start.getFullYear() === end.getFullYear() &&
      start.getMonth() === end.getMonth() &&
      start.getDate() === end.getDate();

    if (sameDay) {
      // Aug 21, 5:00 PM–10:00 PM
      return (
        start.toLocaleDateString([], { dateStyle: "medium" }) +
        ", " +
        start.toLocaleTimeString([], { timeStyle: "short" }) +
        "–" +
        end.toLocaleTimeString([], { timeStyle: "short" })
      );
    }
    // Aug 21, 5:00 PM → Aug 24, 10:00 PM
    return (
      start.toLocaleString([], { dateStyle: "medium", timeStyle: "short" }) +
      " → " +
      end.toLocaleString([], { dateStyle: "medium", timeStyle: "short" })
    );
  };

  const Card = ({
    id, title, when, end, location, description, link,
  }: any) => (
    <div key={id} className="card p-4">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-[var(--color-muted)]">
        {fmtRange(when, end)}{location ? ` • ${location}` : ""}
      </p>
      {description && <p className="text-sm mt-2">{description}</p>}

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-plain inline-flex mt-3"
        >
          More info →
        </a>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      {thisWeek.length > 0 && (
        <section className="space-y-3">
          <h2 className="h-serif text-xl">This Week in Crane</h2>
          <div className="mt-1 grid gap-4 sm:grid-cols-2">
            {thisWeek.map(Card)}
          </div>
        </section>
      )}

      <section className="space-y-3">
        <h2 className="h-serif text-xl">All Upcoming Events</h2>
        <div className="mt-1 grid gap-4 sm:grid-cols-2">
          {allEvents.map(Card)}
        </div>
      </section>
    </div>
  );
}
