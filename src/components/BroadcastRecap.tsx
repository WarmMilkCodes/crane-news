// components/BroadcastRecap.tsx

type Team = {
  name: string;           // "Crane Pirates"
  short?: string;         // "CRANE PIRATES"
  shell: string;          // team color (used for score tint)
  mask: string;           // kept for compatibility (unused)
  score: number;          // 8
  record?: string;        // "0–1"
};

type Meta = {
  date: string;           // ISO or pretty date
  venue?: string;         // "Crane"
  competition?: string;   // "Junior High Football"
  note?: string;          // "Only home game"
};

type ScoringPlay = { t: string; desc: string };
type PlayerLine = { name: string; line: string };

type Props = {
  home: Team;
  away: Team;
  meta: Meta;
  scoring?: ScoringPlay[];
  players?: PlayerLine[];
};

export default function BroadcastRecap({
  home,
  away,
  meta,
  scoring = [],
  players = [],
}: Props) {
  const homeWin = home.score > away.score;
  const awayWin = away.score > home.score;

  return (
    <section className="rounded-3xl overflow-hidden shadow-xl border border-black/5 bg-gradient-to-br from-white to-gray-50 mb-6">
      {/* Teams + Score */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 p-4 sm:p-6 md:p-8">
        <Side team={home} scoreEmphasis={homeWin} />

        {/* Center meta (desktop) */}
        <div className="hidden md:flex flex-col items-center gap-1 px-6">
          <div className="text-[11px] uppercase tracking-widest text-gray-500">
            {meta.competition ?? "Game Recap"}
          </div>
          <div className="text-xl font-extrabold tracking-tight text-gray-900">
            {formatDate(meta.date)}
          </div>
          <div className="text-sm text-gray-600">
            {meta.venue ? `• ${meta.venue}` : ""}
          </div>
          {meta.note && (
            <div className="mt-1 text-[11px] text-gray-500">{meta.note}</div>
          )}
        </div>

        <Side team={away} scoreEmphasis={awayWin} alignRight />

        {/* Center meta (mobile) */}
        <div className="md:hidden border-t border-black/5 pt-3 -mt-1 text-center">
          <div className="text-[11px] uppercase tracking-widest text-gray-500">
            {meta.competition ?? "Game Recap"}
          </div>
          <div className="text-base font-extrabold text-gray-900">
            {formatDate(meta.date)}
            {meta.venue ? ` • ${meta.venue}` : ""}
          </div>
          {meta.note && (
            <div className="mt-1 text-[11px] text-gray-500">{meta.note}</div>
          )}
        </div>
      </div>

      {/* Scoring / Players */}
      {(scoring.length > 0 || players.length > 0) && (
        <div className="bg-white/70 border-t border-black/5 px-4 sm:px-6 md:px-8 py-4">
          <div className="grid md:grid-cols-2 gap-4">
            {scoring.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                  Scoring Summary
                </h3>
                <ul className="space-y-1.5 text-sm">
                  {scoring.map((s, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="shrink-0 text-gray-500 w-16">{s.t}</span>
                      <span className="text-gray-900">{s.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {players.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                  Players to Note
                </h3>
                <ul className="space-y-1.5 text-sm">
                  {players.map((p, i) => (
                    <li key={i} className="flex justify-between gap-3">
                      <span className="text-gray-900">{p.name}</span>
                      <span className="text-gray-700">{p.line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function Side({
  team,
  scoreEmphasis,
  alignRight = false,
}: {
  team: Team;
  scoreEmphasis: boolean;
  alignRight?: boolean;
}) {
  const scoreColor = readableScoreColor(team.shell);

  return (
    <div
      className={[
        "flex items-center gap-4",
        alignRight ? "justify-end text-right" : "",
      ].join(" ")}
    >
      <div className="min-w-0">
        <div className="text-[12px] sm:text-sm uppercase tracking-wide text-gray-500">
          {team.short ?? team.name}
          {team.record ? ` · ${team.record}` : ""}
        </div>
        <div
          className={[
            "leading-none",
            scoreEmphasis ? "font-black" : "font-extrabold",
            "text-4xl sm:text-5xl md:text-6xl",
          ].join(" ")}
          style={{ color: scoreColor }}
        >
          {team.score}
        </div>
      </div>
    </div>
  );
}

function formatDate(d: string) {
  const dt = new Date(d);
  if (isNaN(+dt)) return d;
  return dt.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/** Choose a readable score color against white backgrounds */
function readableScoreColor(hex: string) {
  const c = hex?.trim().toLowerCase();
  if (!c || !c.startsWith("#")) return "#111827"; // gray-900
  const [r, g, b] = hexToRgb(c);
  const L = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);
  return L > 0.7 ? "#111827" : hex;
}

function hexToRgb(h: string): [number, number, number] {
  let r = 0, g = 0, b = 0;
  if (h.length === 4) {
    r = parseInt(h[1] + h[1], 16);
    g = parseInt(h[2] + h[2], 16);
    b = parseInt(h[3] + h[3], 16);
  } else if (h.length === 7) {
    r = parseInt(h.slice(1, 3), 16);
    g = parseInt(h.slice(3, 5), 16);
    b = parseInt(h.slice(5, 7), 16);
  }
  return [r, g, b];
}
