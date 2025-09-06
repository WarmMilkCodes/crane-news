// components/GameRecapBox.tsx
import Helmet from "@/components/Helmet";

type NextGame = {
  date: string;
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
  homeHelmet: { shell: string; mask: string; logo?: string };
  awayHelmet: { shell: string; mask: string; logo?: string };
};

function formatDate(d?: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
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
  homeHelmet,
  awayHelmet,
}: Props) {
  const homeWin = homeScore > awayScore;
  const awayWin = awayScore > homeScore;

  return (
    <section className="rounded-[18px] border border-black/8 bg-white shadow p-5 mb-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">🏈</span>
        <h2 className="text-lg font-extrabold tracking-tight text-gray-900">
          Game Recap
        </h2>
      </div>

      {/* Scoreboard */}
      <div className="grid grid-cols-2 gap-4 items-center rounded-xl border border-black/5 p-4">
        {/* Home */}
        <div className="flex items-center gap-3">
          <Helmet
            width={48}
            shellColor={homeHelmet.shell}
            facemaskColor={homeHelmet.mask}
            stripeColor={null} // Pirates: no stripe
            logoText="CR"
          />
          <div>
            <div className="uppercase tracking-wide text-[11px] text-gray-500">
              {homeTeam}
            </div>
            <div
              className={`text-3xl ${homeWin ? "font-black" : "font-bold"}`}
              style={{ color: homeHelmet.shell }}
            >
              {homeScore}
            </div>
          </div>
        </div>

        {/* Away */}
        <div className="flex items-center gap-3 justify-end text-right">
          <div>
            <div className="uppercase tracking-wide text-[11px] text-gray-500">
              {awayTeam}
            </div>
            <div
              className={`text-3xl ${awayWin ? "font-black" : "font-bold"}`}
              style={{ color: awayHelmet.shell }}
            >
              {awayScore}
            </div>
          </div>
          <Helmet
            width={48}
            shellColor={awayHelmet.shell}
            facemaskColor={awayHelmet.mask}
            stripeColor={null} // Lighthouse: no stripe
            logoText="LC"
            flip
          />
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
              {formatDate(nextGame.date)} · {nextGame.location} vs{" "}
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
