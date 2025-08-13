export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string;  // ISO
  body: string[];
  tags?: string[];
};

export const posts: Post[] = [
  {
    slug: "rose-ave-sidewalk-project",
    title: "Rose Ave Sidewalk Construction Continues",
    summary: "Daytime closures in active work zones. Use alternate routes and watch for workers.",
    date: "2025-08-10",
    body: [
      "Crews are continuing sidewalk improvements along Rose Ave.",
      "Sections will be closed during daytime work hours. Please follow posted detours and use caution in work zones."
    ],
    tags: ["roads", "public-works"]
  },
  {
    slug: "back-to-school-events",
    title: "Back-to-School Events This Week",
    summary: "Open houses, supply drives, and first-day reminders for Crane schools.",
    date: "2025-08-08",
    body: [
      "Crane schools will host open houses and supply events this week.",
      "Check the district site for grade-level times; allow extra time for parking."
    ],
    tags: ["schools", "events"]
  }
];

export function getLatest(n = 6) {
  return [...posts].sort((a,b)=>+new Date(b.date)-+new Date(a.date)).slice(0,n);
}
export function getPost(slug: string) { return posts.find(p => p.slug === slug); }
