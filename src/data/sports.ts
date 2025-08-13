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
    id: "2025-08-22-fb-hs-lamina",
    date: "2025-08-22T19:00:00-05:00",
    level: "HS",
    sport: "Football",
    opponent: "Lamina Tigers",
    home: true,
    venue: "Crane Stadium",
    status: "Scheduled",
    notes: "Senior night details TBA",
  },
  {
    id: "2025-08-25-vb-jh-oakridge",
    date: "2025-08-25T17:30:00-05:00",
    level: "JH",
    sport: "Volleyball",
    opponent: "Oakridge",
    home: false,
    venue: "Oakridge MS Gym",
    status: "Scheduled",
  },
  {
    id: "2025-08-29-fb-hs-millcreek",
    date: "2025-08-29T19:00:00-05:00",
    level: "HS",
    sport: "Football",
    opponent: "Mill Creek",
    home: false,
    venue: "Mill Creek HS",
    status: "Scheduled",
  },
];

export const standings: StandingsRow[] = [
  { level: "HS", sport: "Football", wins: 0, losses: 0 },
  { level: "JH", sport: "Volleyball", wins: 0, losses: 0 },
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
