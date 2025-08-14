// src/data/media.ts
export type MediaItem = {
  id: string;
  title: string;
  year?: number;
  kind: "Movie" | "Show" | "Other";
  source: "Internet Archive" | "Library of Congress" | "NASA" | "Other";
  poster?: string;                 // /media/*.jpg (optional)
  url: string;                     // direct mp4 or HLS master.m3u8
  captions?: string;               // WebVTT
  notes?: string;                  // licensing/source notes
};

export const media: MediaItem[] = [
  {
    id: "detour-1945",
    title: "Detour",
    year: 1945,
    kind: "Movie",
    source: "Internet Archive",
    poster: "/media/detour.jpg",
    url: "https://archive.org/download/Detour/Detour_512kb.mp4",
    notes: "Commonly treated as public domain; verify per your risk tolerance."
  },
  {
    id: "plan9-1959",
    title: "Plan 9 from Outer Space",
    year: 1959,
    kind: "Movie",
    source: "Internet Archive",
    poster: "/media/plan9.jpg",
    url: "https://archive.org/download/Plan_9_from_Outer_Space_1959/Plan_9_from_Outer_Space_1959_512kb.mp4",
    notes: "Widely circulated as public domain; verify preferred source."
  }
];
