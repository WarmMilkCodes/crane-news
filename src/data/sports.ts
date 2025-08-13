export type TeamLevel = "JH" | "HS";
export type SportKind = "Football" | "Basketball" | "Baseball" | "Softball" | "Volleyball" | "Track" | "Cross Country" | "Cheer";

export type Game = {
  id: string;
  date: string;          // ISO
  level: TeamLevel;      // JH / HS
  sport: SportKind;
  opponent: string;
  home: boolean;
  venue?: string;
  status: "Scheduled" | "Final" | "Postponed" | "Canceled";
  score?: { home: number; away: number }; // if Final
  notes?: string;
};

export type StandingsRow = {
  level: TeamLevel;
  sport: SportKind;
  wins: number;
  losses: number;
  ties?: number;
  notes?: string;
};

export const games: Game[] = [
  {
    id: "2025-08-30-vb-hs-monett-tourn",
    date: "2025-08-30T12:00",
    level: "HS",
    sport: "Volleyball",
    opponent: "Monett",
    home: false,
    venue: "Monett High School",
    status: "Scheduled"
  },
  {
    id: "2025-09-01-bsb-hs-sparta",
    date: "2025-09-01T17:00",
    level: "HS",
    sport: "Baseball",
    opponent: "Sparta Trojans",
    home: true,
    venue: "Tootie Parsons Memorial Stadium",
    status: "Scheduled"
  },
  {
    id: "2025-09-02-bsb-hs-exeter",
    date: "2025-09-02T17:00",
    level: "HS",
    sport: "Baseball",
    opponent: "Exeter Tigers",
    home: true,
    venue: "Tootie Parsons Memorial Stadium",
    status: "Scheduled"
  },
  {
    id: "2025-09-04-vb-fordland",
    date: "2025-09-04T17:30",
    level: "HS",
    sport: "Volleyball",
    opponent: "Fordland Eagles",
    home: true,
    venue: "Crane High School",
    status: "Scheduled"
  }
];

export const standings: StandingsRow[] = [
  { level: "HS", sport: "Baseball", wins: 0, losses: 0 },
  { level: "HS", sport: "Volleyball", wins: 0, losses: 0 },
];

// Helpers
export function getUpcomingGames(n = 6) {
  const now = Date.now();
  return [...games]
    .filter(g => +new Date(g.date) >= now && g.status !== "Canceled")
    .sort((a, b) => +new Date(a.date) - +new Date(b.date))
    .slice(0, n);
}

export function getRecentResults(n = 6) {
  const now = Date.now();
  return [...games]
    .filter(g => +new Date(g.date) < now && g.status === "Final")
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, n);
}
