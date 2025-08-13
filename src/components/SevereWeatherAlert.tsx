"use client";

import { useEffect, useState } from "react";
import { AlertBar } from "@/components/AlertBar";

type WeatherAPI = {
  current?: { weather_code?: number; time?: string };
  daily?: { time: string[]; weather_code: number[] };
};

const SEVERE_CODES = new Set([95, 96, 99]); // thunder / severe thunder

function labelFor(code?: number) {
  if (code == null) return "Severe weather";
  if (code === 95) return "Thunderstorms";
  if (code === 96 || code === 99) return "Severe thunderstorms";
  return "Severe weather";
}

export default function SevereWeatherAlert() {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/weather", { cache: "no-store" });
        if (!res.ok) return;

        const data: WeatherAPI = await res.json();

        // Check current condition
        const cur = data.current?.weather_code;
        if (cur != null && SEVERE_CODES.has(cur)) {
          if (!alive) return;
          setText(`${labelFor(cur)} in the area. Use caution and check local alerts.`);
          return;
        }

        // Check today's daily code (index 0)
        const todayCode = data.daily?.weather_code?.[0];
        if (todayCode != null && SEVERE_CODES.has(todayCode)) {
          if (!alive) return;
          setText(`${labelFor(todayCode)} possible today. Monitor the forecast and plan accordingly.`);
          return;
        }

        if (alive) setText(null);
      } catch {
        // Fail quietly; no banner if we can't fetch
        if (alive) setText(null);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (!text) return null;
  return <AlertBar variant="red" text={text} />;
}
