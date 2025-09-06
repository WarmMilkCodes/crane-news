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
    slug: "1929-09-05-veedol-wins",
    date: "1929-09-05",
    title: "Veedol Wins!",
    summary: [
      "Veedol motor oil was the lubricant used for the engines of the Graf Zeppelin, the first airship to complete a circumnavigation of the globe. The airship's successful 21-day journey demonstrated the durability and quality of Veedol's lubricants. "
    ],
    image: "/history/veedol.jpg",
    attribution: "The Crane Chronicle — Sep. 05, 1929",
    citation: "Original print edition; public domain due to publication date (≥95 years).",
    publicDomain: true,
    links: [
      { label: "Newspapers.com", href: "https://www.newspapers.com/article/the-crane-chronicle/180511353/" }
      // if you want to point to Newspapers.com or a library page (avoid full scans if not PD)
      // { label: "Library index", href: "https://…" }
    ],
  },
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
      { label: "Newspapers.com", href: "https://img.newspapers.com/img/img?user=2900416&id=588454529&clippingId=179189247&width=711&height=2209&crop=116_973_711_2209&rotation=0&iat=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVlLXZpZXctaWQiOjU4ODQ1NDUyOSwiaWF0IjoxNzU1NjE2MjEzLCJleHAiOjE3NTU3MDI2MTN9.vKp2N6fANIIWd8ME7oyf9_FsP_hqCfGdmpraOfBT_MU" }
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
