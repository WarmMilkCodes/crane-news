// src/data/events.ts

export type Event = {
  id: string;
  title: string;
  when: string;      // ISO date string
  location?: string;
  description?: string;
  link?: string;
};

export const events: Event[] = [
  // Example:
  {
    id: "open-house-2025",
    title: "School Open House",
    when: "2025-08-14T16:30:00-05:00",
    location: "Crane Elementary & High School",
    description: "Open house will run from 4:30 PM to 6:30 PM for all grade levels and buildings. Allow extra time for parking and bringing class supplies if you have them ready.",
    link: "https://www.crane.k12.mo.us/",
  },
  {
    id: "chicken-chase-2025",
    title: "Crane Chicken Chase",
    when: "2025-08-23T07:30",
    location: "Main Street",
    description: "Run / Walk 5K",
    link: "https://facebook.com/events/s/crane-chicken-chase-5k/3705684569729412/"
  },
];

// ---------------------- Helpers ----------------------

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

/** Safe date parser for ISO strings */
function dt(s?: string) {
  return s ? new Date(s) : undefined;
}

/** Return events occurring this week (local), sorted by start time. */
export function getEventsThisWeek(options?: {
  startOn?: "sun" | "mon";
  fromDate?: Date;   // for testing; defaults to "now"
  limit?: number;    // e.g., 5
}) {
  const { startOn = "sun", fromDate = new Date(), limit } = options ?? {};
  const start = startOfWeek(fromDate, startOn);
  const end = endOfWeek(fromDate, startOn);

  const within = events.filter(e => {
    const when = dt(e.when);
    if (!when) return false;
    return when >= start && when <= end;
  }).sort((a, b) => +new Date(a.when) - +new Date(b.when));

  return typeof limit === "number" ? within.slice(0, limit) : within;
}

export function getEvents() {
  return events;
}
