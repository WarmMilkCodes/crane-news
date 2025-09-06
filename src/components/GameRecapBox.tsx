// components/GameRecapBox.tsx
type NextGame = {
  date: string;        // ISO
  opponent: string;
  location: "Home" | "Away";
  time?: string;
  venueCity?: string;
};

type Props = {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  highlight?: string;
  attendance?: string;
  note?: string;
  nextGame?: NextGame;
};

function formatDate(d?: string) {
  if (!d) return "";
  const dt = new Date(d);
  return dt.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function TeamBadge({ name }: { name: string }) {
  const abbr =
    name
      .replace(/[^A-Za-z ]/g, "")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map(s => s[0])
      .join("")
      .toUpperCase() || "TM";
  return (
    <div className="w-7 h-7 rounded-full bg-black/5 flex items-center justify-center font-black text-[11px] text-gray-700">
      {abbr}
    </div>
  );
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
  const homeWin = homeScore > awayScore;
  const awayWin = awayScore > homeScore;

  return (
    <section className="rounded-[18px] border border-black/8 bg-white shadow-sm p-4 sm:p-5 mb-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🏈</span>
        <h2 className="text-lg font-extrabold tracking-tight text-gray-900">Game Recap</h2>
      </div>

      {/* Scoreboard */}
      <div className="grid grid-cols-2 gap-4 items-center rounded-xl border border-black/5 p-3 sm:p-4">
        {/* Home */}
        <div className="flex items-center gap-3">
          <TeamBadge name={homeTeam} />
          <div className="min-w-0">
            <div className="uppercase tracking-wide text-[11px] text-gray-500">Crane</div>
            <div className={`text-2xl sm:text-3xl leading-none ${homeWin ? "font-black" : "font-bold"} text-gray-900`}>
              {homeScore}
            </div>
          </div>
        </div>

        {/* Away */}
        <div className="flex items-center gap-3 justify-end text-right">
          <div className="min-w-0">
            <div className="uppercase tracking-wide text-[11px] text-gray-500">{awayTeam}</div>
            <div className={`text-2xl sm:text-3xl leading-none ${awayWin ? "font-black" : "font-bold"} text-gray-900`}>
              {awayScore}
            </div>
          </div>
          <TeamBadge name={awayTeam} />
        </div>
      </div>

      {/* Details */}
      <div className="mt-4 grid sm:grid-cols-2 gap-y-2 gap-x-6 text-sm">
        {highlight && (
          <>
            <div className="font-semibold text-gray-600">Pirates’ Highlight</div>
            <div className="text-gray-900">{highlight}</div>
          </>
        )}
        {attendance && (
          <>
            <div className="font-semibold text-gray-600">Attendance</div>
            <div className="text-gray-900">{attendance}</div>
          </>
        )}
        {nextGame && (
          <>
            <div className="font-semibold text-gray-600">Next Game</div>
            <div className="text-gray-900">
              {formatDate(nextGame.date)} · {nextGame.location === "Home" ? "Home" : "Away"} vs{" "}
              <span className="font-semibold">{nextGame.opponent}</span>
              {nextGame.time ? ` • ${nextGame.time}` : ""}
              {nextGame.venueCity ? ` • ${nextGame.venueCity}` : ""}
            </div>
          </>
        )}
      </div>

      {note && <p className="mt-3 text-xs text-gray-500">{note}</p>}
    </section>
  );
}
