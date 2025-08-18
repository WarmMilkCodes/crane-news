// src/app/podcast/page.tsx
import type { Metadata } from "next";

// ---- Page metadata (optional)
export const metadata: Metadata = {
  title: "Podcast — Crane.news",
  description:
    "Weekly audio updates about life in Crane — events, school news, local updates, and more.",
};

// ---- Types / data
type Episode = {
  slug: string;
  title: string;
  date: string;        // ISO
  description: string;
  audio: string;       // PUBLIC path, e.g. "/podcast/ep1.mp3"
};

// Put your episodes here or import from data file
const episodes: Episode[] = [
  {
    slug: "ep1",
    title: "Episode 1 – Broiler Festival, School Updates & Brightspeed Fiber",
    date: "2025-08-18",
    description:
      "Our very first Crane.news Weekly Podcast! Brian covers the upcoming Broiler Festival, the Chicken Chase 5K, Crane School updates, Brightspeed Fiber, and more.",
    audio: "/podcast/ep1.mp3", // must exist at <project>/public/podcast/ep1.mp3
  },
];

// ---- Utilities
/** Ensure the URL is root-absolute and respects any basePath configured. */
function publicUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ""; // e.g. "/news" if you host under a subpath
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}

/** Card UI extracted for clarity (server component is fine) */
function PodcastCard({ ep }: { ep: Episode }) {
  const audioSrc = publicUrl(ep.audio);

  return (
    <div className="border rounded-lg p-4 shadow bg-[#1d2a3a] text-[#ffffff]">
      <h2 className="text-xl font-semibold">{ep.title}</h2>
      <p className="text-sm opacity-80 mb-2">
        {new Date(ep.date).toLocaleDateString()}
      </p>
      <p className="mb-4">{ep.description}</p>

      {/* Provide a concrete src and key so it reloads correctly after client nav */}
      <audio
        key={audioSrc}
        controls
        preload="metadata"
        className="w-full mb-2"
        src={audioSrc}
      >
        <source src={audioSrc} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Use a plain <a> for reliable downloads */}
      <a href={audioSrc} className="text-yellow-300 hover:underline text-sm" download>
        Download MP3
      </a>
    </div>
  );
}

// ---- Page
export default function PodcastPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🎙️ Crane.news Weekly Podcast</h1>
      <p className="mb-8 text-gray-600">
        Weekly audio updates about life in Crane — events, school news, local
        updates, and more.
      </p>

      <div className="space-y-8">
        {episodes.map((ep) => (
          <PodcastCard key={ep.slug} ep={ep} />
        ))}
      </div>
    </div>
  );
}
