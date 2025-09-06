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
    id: "2025-09-01-vb-hs-monett",
    date: "2025-09-01T12:00",
    level: "HS",
    sport: "Volleyball",
    opponent: "Monett",
    home: false,
    venue: "Monett High School",
    status: "Final",
    score: { home: 3, away: 1},
    notes: "Crane HS volleyball lost to Monett 1-3. The team is now 0-1 on the season."
  },
  {
    id: "2025-09-02-bsb-hs-exter",
    date: "2025-09-02T17:00",
    level: "HS",
    sport: "Baseball",
    opponent: "Exter Tigers",
    home: true,
    venue: "Tootie Parsons Memorial Stadium",
    status: "Final",
    score: { home: 5, away: 11},
    notes: "Crane HS baseball lost to Exter 5-11 on September 2. The team is now 0-1 on the season."
  },
  {
    id: "2025-09-04-bsb-hs-wheaton",
    date: "2025-09-04T17:00",
    level: "HS",
    sport: "Baseball",
    opponent: "Wheaton Bulldogs",
    home: false,
    venue: "Wheaton High School",
    status: "Final",
    score: { home: 10, away: 0},
    notes: "Crane HS baseball defeated Wheaton 10-0 on September 4. The team is now 0-2 on the season."
  },
  {
    id: "2025-09-04-vb-fordland",
    date: "2025-09-04T17:30",
    level: "HS",
    sport: "Volleyball",
    opponent: "Fordland Eagles",
    home: true,
    venue: "Crane High School",
    status: "Final",
    score: { home: 1, away: 3},
    notes: "Crane HS volleyball lost to Fordland 1-3 on September 4. The team is now 0-2 on the season."
  },
  {
    id: "2025-09-04-fb-jh-lighthouse",
    date: "2025-09-04T18:00",
    level: "JH",
    sport: "Football",
    opponent: "Lighthouse Academy",
    home: true,
    venue: "Crane High School",
    status: "Final",
    score: { home: 8, away: 48 },
    notes: "Crane JH football lost to Lighthouse Academy 8-48 on September 4. The team is now 0-1 on the season."
  },
  {
    id: "2025-09-05-vb-blue-eye",
    date: "2025-09-05T17:00",
    level: "HS",
    sport: "Volleyball",
    opponent: "Blue Eye Bulldogs",
    home: false,
    venue: "Blue Eye High School",
    status: "Final",
    score: { home: 2, away: 3},
    notes: "Crane HS volleyball won against Blue Eye 3-2 on September 5. The team is now 1-2 on the season."
  },
  {
    id: "2025-09-08-vb-seneca",
    date: "2025-09-08T17:00",
    level: "HS",
    sport: "Volleyball",
    opponent: "Seneca Indians",
    home: false,
    venue: "Seneca High School",
    status: "Scheduled",
  },
  {
    id: "2025-09-09-bsb-hs-billings",
    date: "2025-09-09T17:00",
    level: "HS",
    sport: "Baseball",
    opponent: "Billings Wildcats",
    home: false,
    venue: "Billings High School",
    status: "Scheduled",
  },

];

export const standings: StandingsRow[] = [
  { level: "HS", sport: "Baseball", wins: 0, losses: 2 },
  { level: "HS", sport: "Volleyball", wins: 1, losses: 2 },
  { level: "JH", sport: "Football", wins: 0, losses: 1 }
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
