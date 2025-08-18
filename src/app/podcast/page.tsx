// src/app/podcast/page.tsx
import Link from "next/link";

type Episode = {
  slug: string;
  title: string;
  date: string;
  description: string;
  audio: string; // mp3 or m4a file path
};

const episodes: Episode[] = [
  {
    slug: "ep1",
    title: "Episode 1 – Broiler Festival, School Updates & Brightspeed Fiber",
    date: "2025-08-18",
    description:
      "Our very first Crane.news Weekly Podcast! Brian covers the upcoming Broiler Festival, the Chicken Chase 5K, Crane School updates, Brightspeed Fiber, and more.",
    audio: "/podcast/ep1.mp3", // file placed in /public/podcast
  },
];

export default function PodcastPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🎙️ Crane.news Weekly Podcast</h1>
      <p className="mb-8 text-gray-600">
        Weekly audio updates about life in Crane - events, school news, local
        updates, and more.
      </p>

      <div className="space-y-8">
        {episodes.map((ep) => (
          <div
            key={ep.slug}
            className="border rounded-lg p-4 shadow bg-[#1d2a3a] text-[#ffffff]"

            >
            <h2 className="text-xl font-semibold">{ep.title}</h2>
            <p className="text-sm opacity-80 mb-2">
                {new Date(ep.date).toLocaleDateString()}
            </p>
            <p className="mb-4">{ep.description}</p>

            <audio controls className="w-full mb-2" />
            <Link
                href={ep.audio}
                className="text-yellow-300 hover:underline text-sm"
                download
            >
                Download MP3
            </Link>
            </div>

        ))}
      </div>
    </div>
  );
}
