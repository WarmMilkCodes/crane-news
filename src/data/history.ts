// src/data/history.ts
export type HistoryItem = {
  slug: string;            // unique id, e.g. "1929-08-15-school-opening"
  date: string;            // ISO of the original paper date (week anchor)
  title: string;           // short headline
  summary: string[];       // a few short paragraphs in your own words
  image?: string;          // /history/*.jpg or .png (clipping)
  attribution?: string;    // e.g. "The Crane Chronicle, Aug. 15, 1929"
  citation?: string;       // longer source note, link optional
  publicDomain?: boolean;  // helpful flag (pre-1929)
  links?: { label: string; href: string }[];
};

export const history: HistoryItem[] = [
  {
    slug: "1929-08-15-school-opening",
    date: "1929-08-15",
    title: "Schools to Open Sept. 2 — New High School Delayed",
    summary: [
      "Superintendent Y. M. Jackson and the board announced Crane schools would open Monday, September 2.",
      "The new high school building wouldn’t be ready until mid-October or later due to material delays; classes would continue in existing buildings until then.",
      "Jackson called it one of the most important years for Crane’s schools, noting rising interest and record high-school enrollment expected."
    ],
    image: "/history/1929-08-15-school-opening.jpg",
    attribution: "The Crane Chronicle — Aug. 15, 1929",
    citation: "Original print edition; public domain due to publication date (≥95 years).",
    publicDomain: true,
    links: [
      // if you want to point to Newspapers.com or a library page (avoid full scans if not PD)
      // { label: "Library index", href: "https://…" }
    ],
  },
];

export function getHistory() {
  return [...history].sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getHistoryItem(slug: string) {
  return history.find(h => h.slug === slug);
}

export function getLatestHistory(n = 6) {
  return getHistory().slice(0, n);
}
