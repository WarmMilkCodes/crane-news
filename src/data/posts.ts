export type PostLink = { label: string; href: string }

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
  links?: PostLink[];  // source URLs
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
            "Crane Schools will host an all-buildings Open House on Wednesday, August 14 from 4:30–6:30 PM. Families can meet teachers, find classrooms, and drop off supplies before the first day, Tuesday, August 19th.",
            "Who should attend: All grade levels (Elementary, Junior High, and High School). New families are especially encouraged to come early to allow time for schedules and bus information.",
            "Where to go: Elementary families may enter through the main office doors; Junior High and High School through the High School entrance.",
            "What to bring: Class supply lists if you have them, any required forms, and optional fees (yearbook, activity). You can drop off labeled supplies in classrooms to lighten first-day backpacks.",
            "Parking & traffic: Lots are expected to be full between 4:30–5:15 PM. Overflow parking will be available in the gravel lots; please avoid blocking the roads.",
            "Schedules & lockers: Student schedules will be available in the office.",
            "Transportation: Bus information will be given to you by your child's homeroom teacher. High school will check with office..",
            "Health & forms: The nurse’s office will accept medication forms and immunization records.",
            "More information: The district will post any last-minute changes on its website and Facebook page the day of the event."
            ],
        links: [
            { label: "District Website", href: "https://www.crane.k12.mo.us/" }
        ]
    }
]

export function getLatest(n = 6) {
  return [...posts].sort((a,b)=>+new Date(b.date)-+new Date(a.date)).slice(0,n);
}
export function getPost(slug: string) { return posts.find(p => p.slug === slug); }
