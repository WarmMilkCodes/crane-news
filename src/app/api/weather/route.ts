import { NextResponse } from "next/server";

const LAT = process.env.NEXT_PUBLIC_LAT ?? "36.9045";
const LON = process.env.NEXT_PUBLIC_LON ?? "-93.5713";

export async function GET() {
  const params = new URLSearchParams({
    latitude: LAT,
    longitude: LON,
    current: "temperature_2m,apparent_temperature,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    temperature_unit: "fahrenheit",
    wind_speed_unit: "mph",
    timezone: "auto",
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

  const res = await fetch(url, { next: { revalidate: 1800 } }); // cache 30 min on server
  if (!res.ok) {
    return NextResponse.json({ error: "weather_fetch_failed" }, { status: 502 });
  }

  const data = await res.json();
  return NextResponse.json({ lat: LAT, lon: LON, ...data });
}
