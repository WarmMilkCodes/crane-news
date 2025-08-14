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
  mature: boolean;
};

export const media: MediaItem[] = [
  {
    id: "detour-1945",
    title: "Detour",
    year: 1945,
    kind: "Movie",
    source: "Internet Archive",
    poster: "/detour.jpg",
    url: "https://archive.org/download/Detour/Detour_512kb.mp4",
    mature: false
  },
  {
    id: "plan9-1959",
    title: "Plan 9 from Outer Space",
    year: 1959,
    kind: "Movie",
    source: "Internet Archive",
    poster: "/plan-9.jpg",
    url: "https://archive.org/download/Plan_9_from_Outer_Space_1959/Plan_9_from_Outer_Space_1959_512kb.mp4",
    mature: false
  },
  {
    id: "20000leagues-1916",
    title: "20,000 Leagues Under the Sea",
    year: 1916,
    kind: "Movie",
    source: "Internet Archive",
    poster: "/20000-leagues.jpg",
    url: "https://archive.org/download/20000LeaguesUndertheSea/20000_Leagues_Under_the_Sea_512kb.mp4",
    mature: false
  },
  {
    id: "sahara-1943",
    title: "Sahara",
    year: 1943,
    kind: "Movie",
    source: "Internet Archive",
    poster: "/sahara.jpg",
    url: "https://archive.org/download/sahara-colorized/Sahara%201943.mp4",
    mature: false
  },
  {
    id: "mohicans-1936",
    title: "Last of the Mohicans",
    year: 1936,
    kind: "Movie",
    source: "Internet Archive",
    poster: "/mohicans.jpg",
    url: "https://archive.org/download/last-of-the-mohicans-1936-colorized/Last%20of%20the%20Mohicans%201936%20colorized.mp4",
    mature: false
  },
  {
    id: "night-of-the-living-dead-1968",
    title: "Night of the Living Dead",
    year: 1968,
    kind: "Movie",
    source: "Internet Archive",
    poster: "/livingdead.jpg",
    url: "https://archive.org/download/Night.Of.The.Living.Dead_1080p/NightOfTheLivingDead_DVD9_512kb.mp4",
    mature: true
  }
];
