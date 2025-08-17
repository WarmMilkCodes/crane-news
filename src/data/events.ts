// src/data/events.ts

export type Event = {
  id: string;
  title: string;
  when: string;          // ISO date string (start)
  end?: string;          // (optional) ISO date string (end)
  location?: string;
  description?: string;
  link?: string;
};

export const events: Event[] = [
  {
    id: "broiler-festival-2025",
    title: "2025 Broiler Festival",
    when: "2025-08-21T17:00:00-05:00",     // add explicit TZ for consistency
    end:  "2025-08-24T22:00:00-05:00",
    location: "Crane City Park",
    link: "https://cranebroilerfestival.org/"
  },
  {
    id: "chicken-chase-2025",
    title: "Crane Chicken Chase",
    when: "2025-08-23T07:30:00-05:00",
    location: "Main Street",
    description: "Run / Walk 5K",
    link: "https://facebook.com/events/s/crane-chicken-chase-5k/3705684569729412/"
  },
  {
    id: "open-house-2025",
    title: "School Open House",
    when: "2025-08-14T16:30:00-05:00",
    end:  "2025-08-14T18:30:00-05:00",
    location: "Crane Elementary & High School",
    description:
      "Open house will run from 4:30 PM to 6:30 PM for all grade levels and buildings. Allow extra time for parking and bringing class supplies if you have them ready.",
    link: "https://www.crane.k12.mo.us/",
  }
];

// ---------------------- Helpers ----------------------

/** Parse ISO safely. If string lacks timezone, treat as local time. */
function parseISO(s: string): Date {
  // If it already has a timezone offset or Z, native Date handles it.
  if (/[zZ]|[+\-]\d{2}:\d{2}$/.test(s)) return new Date(s);

  // Treat "YYYY-MM-DDTHH:mm(:ss)?" as LOCAL time explicitly.
  const m = s.match(
    /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?$/
  );
  if (m) {
    const [, y, mo, d, h, mi, se] = m.map(Number);
    return new Date(y, mo - 1, d, h, mi, se || 0, 0);
  }

  // Fallback (Date will assume UTC for date-only strings)
  return new Date(s);
}

/** Start-of-week for a given date (local time). startOn: "sun" | "mon" */
function startOfWeek(d: Date, startOn: "sun" | "mon" = "sun") {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const day = x.getDay(); // 0=Sun ... 6=Sat
  const diff = startOn === "sun" ? day : (day === 0 ? 6 : day - 1);
  x.setDate(x.getDate() - diff);
  x.setHours(0, 0, 0, 0);
  return x;
}

/** End-of-week (inclusive end-of-day) for the same start rule */
function endOfWeek(d: Date, startOn: "sun" | "mon" = "sun") {
  const start = startOfWeek(d, startOn);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
}

function eventStart(e: Event) { return parseISO(e.when); }
function eventEnd(e: Event)   { return e.end ? parseISO(e.end) : parseISO(e.when); }

/** Return events occurring this week (overlaps included), future-facing. */
export function getEventsThisWeek(options?: {
  startOn?: "sun" | "mon";
  fromDate?: Date;   // for testing; defaults to "now"
  limit?: number;
}) {
  const { startOn = "sun", fromDate = new Date(), limit } = options ?? {};
  const weekStart = startOfWeek(fromDate, startOn);
  const weekEnd = endOfWeek(fromDate, startOn);

  const within = events
    // overlap test: (eventStart <= weekEnd) && (eventEnd >= weekStart)
    .filter(e => eventStart(e) <= weekEnd && eventEnd(e) >= weekStart)
    // hide events that ended before "now"
    .filter(e => eventEnd(e) >= fromDate)
    .sort((a, b) => +eventStart(a) - +eventStart(b));

  return typeof limit === "number" ? within.slice(0, limit) : within;
}

/** All future events sorted by start time. */
export function getEventsUpcoming(fromDate: Date = new Date()) {
  return events
    .filter(e => eventEnd(e) >= fromDate)
    .sort((a, b) => +eventStart(a) - +eventStart(b));
}

export function getEvents() {
  return events;
}
