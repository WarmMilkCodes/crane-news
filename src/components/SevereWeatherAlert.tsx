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

// local YYYY-MM-DD (avoids UTC shifting the day)
function todayLocalYMD() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function SevereWeatherAlert() {
  const [text, setText] = useState<string | null>(null);
  const [variant, setVariant] = useState<"red" | "blue">("red");

  useEffect(() => {
    let alive = true;

    async function check() {
      try {
        const res = await fetch("/api/weather", { cache: "no-store" });
        if (!res.ok) {
          if (alive) {
            setText(null);
          }
          return;
        }

        const data: WeatherAPI = await res.json();

        // 1) Check current condition (immediate risk)
        const curCode = data.current?.weather_code;
        if (curCode != null && SEVERE_CODES.has(curCode)) {
          if (!alive) return;
          setText(`${labelFor(curCode)} in the area. Use caution and check local alerts.`);
          setVariant(curCode >= 96 ? "red" : "blue");
          return;
        }

        // 2) Check today’s forecast using local date (not just index 0)
        const ymd = todayLocalYMD();
        const idx =
          data.daily?.time?.findIndex((t) => t === ymd) ??
          -1; // may be -1 near midnight if provider rolled over
        const dailyIdx = idx >= 0 ? idx : 0; // fallback to first entry

        const todayCode = data.daily?.weather_code?.[dailyIdx];
        if (todayCode != null && SEVERE_CODES.has(todayCode)) {
          if (!alive) return;
          setText(
            `${labelFor(todayCode)} possible today. Monitor the forecast and plan accordingly.`
          );
          setVariant(todayCode >= 96 ? "red" : "blue");
          return;
        }

        // 3) Otherwise, clear banner
        if (alive) {
          setText(null);
        }
      } catch {
        if (alive) setText(null);
      }
    }

    // initial + poll every 15 minutes
    check();
    const id = setInterval(check, 15 * 60 * 1000);

    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  if (!text) return null;
  return <AlertBar variant={variant} text={text} />;
}
