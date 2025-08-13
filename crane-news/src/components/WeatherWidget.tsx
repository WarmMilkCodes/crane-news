"use client";

import { useEffect, useState } from "react";

type WeatherData = {
  current?: {
    temperature_2m?: number;
    apparent_temperature?: number;
    weather_code?: number;
    wind_speed_10m?: number;
    time?: string;
  };
  daily?: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
};

function wcLabel(code?: number) {
  // Open-Meteo WMO code → simple label
  const m: Record<number, string> = {
    0: "Clear", 1: "Mainly clear", 2: "Partly cloudy", 3: "Cloudy",
    45: "Fog", 48: "Rime fog",
    51: "Drizzle", 61: "Light rain", 63: "Rain", 65: "Heavy rain",
    71: "Snow", 73: "Snow", 75: "Heavy snow",
    80: "Showers", 81: "Showers", 82: "Heavy showers",
    95: "Thunder", 96: "Thunder", 99: "Severe thunder"
  };
  return code != null ? (m[code] ?? "—") : "—";
}

function wcEmoji(code?: number) {
  if (code == null) return "🌡️";
  if (code === 0) return "☀️";
  if ([1, 2].includes(code)) return "⛅";
  if (code === 3) return "☁️";
  if ([45, 48].includes(code)) return "🌫️";
  if ([51, 61, 63, 65, 80, 81, 82].includes(code)) return "🌧️";
  if ([71, 73, 75].includes(code)) return "❄️";
  if ([95, 96, 99].includes(code)) return "⛈️";
  return "🌡️";
}

export default function WeatherWidget() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/weather", { cache: "no-store" });
        if (!res.ok) throw new Error("fetch_failed");
        const j = await res.json();
        if (alive) setData({ current: j.current, daily: j.daily });
      } catch (_err: unknown) {
        if (alive) setErr("Weather unavailable");
      }
    })();

    const id = setInterval(() => {
      fetch("/api/weather", { cache: "no-store" })
        .then(r => r.ok ? r.json() : Promise.reject())
        .then(j => setData({ current: j.current, daily: j.daily }))
        .catch(() => {});
    }, 15 * 60 * 1000); // refresh client-side every 15 min

    return () => { alive = false; clearInterval(id); };
  }, []);

  if (err) {
    return <div className="panel p-4 text-sm">{err}</div>;
  }
  if (!data?.current || !data?.daily) {
    return <div className="panel p-4 text-sm">Loading weather…</div>;
  }

  const now = data.current;
  const d = data.daily;
  // Show next 3 days
  const days = d.time.slice(0, 3).map((t, i) => ({
    date: new Date(t),
    code: d.weather_code[i],
    tmax: Math.round(d.temperature_2m_max[i]),
    tmin: Math.round(d.temperature_2m_min[i]),
    pop: d.precipitation_probability_max[i]
  }));

  return (
    <div className="panel p-4">
      <div className="flex items-center justify-between">
        <div className="h-serif text-lg">Weather</div>
        <div className="text-xs text-[var(--color-muted)]">
          Updated {now.time ? new Date(now.time).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : ""}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{wcEmoji(now.weather_code)}</div>
          <div>
            <div className="text-xl font-semibold">{Math.round(now.temperature_2m ?? 0)}°</div>
            <div className="text-xs text-[var(--color-muted)]">{wcLabel(now.weather_code)}</div>
          </div>
        </div>
        <div className="text-xs text-right text-[var(--color-muted)]">
          Feels like {Math.round(now.apparent_temperature ?? now.temperature_2m ?? 0)}°<br />
          Wind {Math.round(now.wind_speed_10m ?? 0)} mph
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
        {days.map((d, i) => (
          <div key={i} className="card p-3 text-center">
            <div className="text-xs text-[var(--color-muted)]">
              {d.date.toLocaleDateString(undefined, { weekday: "short" })}
            </div>
            <div className="text-lg">{wcEmoji(d.code)}</div>
            <div className="text-xs">{wcLabel(d.code)}</div>
            <div className="mt-1 text-xs">
              <span className="font-semibold">{d.tmax}°</span> / <span className="text-[var(--color-muted)]">{d.tmin}°</span>
            </div>
            {Number.isFinite(d.pop) && (
              <div className="text-[var(--color-muted)] text-xs mt-1">
                🌧️ {d.pop}%
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
