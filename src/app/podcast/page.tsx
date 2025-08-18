// src/app/podcast/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Podcast — Crane.news",
  description:
    "Weekly audio updates about life in Crane — events, school news, local updates, and more.",
};

type Episode = {
  slug: string;
  title: string;
  date: string;        // ISO
  description: string;
  audio: string;       // e.g. "/podcast/ep1.mp3" (must live in /public/podcast)
  transcript?: string; // plain text; rendered with whitespace-pre-wrap
};

// ---------- Data ----------
const episodes: Episode[] = [
  {
    slug: "ep1",
    title: "Episode 1 – Broiler Festival, School Updates & Brightspeed Fiber",
    date: "2025-08-18",
    description:
      "Our very first Crane.news Weekly Podcast! Brian covers the upcoming Broiler Festival, the Chicken Chase 5K, Crane School updates, Brightspeed Fiber, and more.",
    audio: "/podcast/ep1.mp3",
    transcript: `Intro music fades in.

Brian:
Welcome to the very first Crane.news Weekly Podcast! I’m Brian, and each week I’ll be sharing the news, events, and stories happening right here in Crane, Missouri.

Community Events:
The 2025 Crane Broiler Festival is almost here. It runs Thursday, August 21st through Sunday the 24th at Crane City Park with food booths, live music on two stages, carnival rides, volleyball, and the famous broiler chicken. Rides open a day early on Wednesday the 20th.
Also on Saturday, August 23rd, the Crane Chicken Chase 5K starts at 7:30 AM on Main Street.

School News:
First day back is Tuesday, August 19th. Watch for buses in the morning.
Crane Schools now offer online meal and snack milk payments through Paywat. There’s a short video showing how to get set up.

Local Updates:
Brightspeed Fiber is coming to Crane with up to 2 gigabit symmetrical service. Crane.news will be the first customer installed and we’ll publish side-by-side tests against Mediacom’s 1 Gig.

Weather Snapshot:
Hot to start the week around 100°, with some relief midweek—showers and highs in the 90s.

Community Notes:
We remember Carol Lee Maples, age 84, of Crane. Our condolences to her family and friends.

Outro music fades in.
That’s it for Episode 1. Check Crane.news for updates, photos, and stories. I’m Brian—see you next time.
Outro music fades out.`,
  },
];

// ---------- Utils ----------
function publicUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}

// ---------- UI ----------
function PodcastCard({ ep }: { ep: Episode }) {
  const audioSrc = publicUrl(ep.audio);

  return (
    <article className="border rounded-lg p-4 shadow bg-[#1d2a3a] text-[#ffffff]">
      <h2 className="text-xl font-semibold">{ep.title}</h2>
      <p className="text-sm opacity-80 mb-2">
        {new Date(ep.date).toLocaleDateString()}
      </p>
      <p className="mb-4">{ep.description}</p>

      <audio
        key={audioSrc}
        controls
        preload="metadata"
        className="w-full mb-3"
        src={audioSrc}
      >
        <source src={audioSrc} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="flex items-center gap-4">
        <a href={audioSrc} className="text-yellow-300 hover:underline text-sm" download>
          Download MP3
        </a>
        {ep.transcript && (
          <details className="group ml-auto w-full">
            <summary
              className="list-none cursor-pointer text-sm inline-flex items-center gap-2 select-none
                         text-yellow-300 hover:underline"
              aria-label="Toggle transcript"
            >
              <span className="inline-block transition-transform group-open:rotate-90">▸</span>
              Transcript
            </summary>
            <div className="mt-2 rounded-lg border border-white/10 bg-white text-gray-900 p-3">
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {ep.transcript}
              </div>
            </div>
          </details>
        )}
      </div>
    </article>
  );
}

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
