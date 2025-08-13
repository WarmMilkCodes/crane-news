export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string;         // ISO
  image?: string;       // /news/*.jpg
  category?: string;    // "News" | "Events" | "School" | ...
  likes?: number;
  comments?: number;
  body: string[];
};

export const posts: Post[] = [
    {
        slug: "school-open-house",
        title: "Pirates Back-to-School Open House",
        summary: "Times for elementary, junior high, and high school open house.",
        date: "2025-08-12",
        category: "School",
        image: "/crane-pirate-logo.jpg",
        body: [
            "Crane Schools have posted the open house schedule that is applicable to all grade levels.",
            "Open house will run from 4:30 PM to 6:30 PM for all grade levels and buildings.",
            "Allow extra time for parking and bringing class supplies if you have them ready."
        ]
    }
]

export function getLatest(n = 6) {
  return [...posts].sort((a,b)=>+new Date(b.date)-+new Date(a.date)).slice(0,n);
}
export function getPost(slug: string) { return posts.find(p => p.slug === slug); }
