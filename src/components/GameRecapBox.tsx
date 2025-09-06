// components/GameRecapBox.tsx
type NextGame = {
  date: string;      // ISO date (e.g., "2025-09-09")
  opponent: string;  // "Joel E. Barber Buckskins"
  location: "Home" | "Away";
  time?: string;     // "5:30 PM"
  venueCity?: string; // optional, e.g., "Lebanon"
};

type Props = {
  // Score
  homeTeam: string;           // "Crane"
  awayTeam: string;           // "Lighthouse Christian"
  homeScore: number;          // 8
  awayScore: number;          // 48
  // Extras
  highlight?: string;         // "#26 Kendrick Bass • 4th Qtr TD run"
  attendance?: string;        // "500+"
  note?: string;              // any small footnote
  nextGame?: NextGame;
};

function formatDate(d?: string) {
  if (!d) return "";
  const dt = new Date(d);
  return dt.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

export default function GameRecapBox({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  highlight,
  attendance,
  note,
  nextGame,
}: Props) {
  const winnerIsHome = homeScore > awayScore;
  const winnerIsAway = awayScore > homeScore;

  return (
    <section className="bg-white rounded-[var(--radius)] shadow-md border border-black/5 p-5 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-3">🏈 Game Recap</h2>

      {/* Score Row */}
      <div className="grid grid-cols-2 gap-3 items-center border-b border-gray-200 pb-3 mb-3">
        <div className="flex flex-col">
          <span className={`text-sm uppercase tracking-wide ${winnerIsHome ? "font-black" : "font-semibold"} text-gray-600`}>
            {homeTeam}
          </span>
          <span className={`text-2xl ${winnerIsHome ? "font-black" : "font-bold"} text-gray-900`}>
            {homeScore}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className={`text-sm uppercase tracking-wide ${winnerIsAway ? "font-black" : "font-semibold"} text-gray-600`}>
            {awayTeam}
          </span>
          <span className={`text-2xl ${winnerIsAway ? "font-black" : "font-bold"} text-gray-900`}>
            {awayScore}
          </span>
        </div>
      </div>

      {/* Facts */}
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm">
        {highlight && (
          <>
            <dt className="font-semibold text-gray-600">Pirates’ Highlight</dt>
            <dd className="text-gray-900">{highlight}</dd>
          </>
        )}
        {attendance && (
          <>
            <dt className="font-semibold text-gray-600">Attendance</dt>
            <dd className="text-gray-900">{attendance}</dd>
          </>
        )}
        {nextGame && (
          <>
            <dt className="font-semibold text-gray-600">Next Game</dt>
            <dd className="text-gray-900">
              {formatDate(nextGame.date)} · {nextGame.location === "Home" ? "Home" : "Away"} vs{" "}
              <span className="font-semibold">{nextGame.opponent}</span>
              {nextGame.time ? ` • ${nextGame.time}` : ""}
              {nextGame.venueCity ? ` • ${nextGame.venueCity}` : ""}
            </dd>
          </>
        )}
      </dl>

      {note && <p className="mt-3 text-xs text-gray-500">{note}</p>}
    </section>
  );
}
