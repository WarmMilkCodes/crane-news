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
  death?: {
    name: string;
    age?: number;
    city?: string;
    dateOfDeath?: string;  // ISO
    services?: {
      visitation?: { at: string, when: string }; // readable place names
      funeral?: { at: string, when: string };
      burial?: { at: string, when: string };
    };
    source?: { label: string, href: string };
  };
};

export const posts: Post[] = [
  {
    slug: "obit-carol-maples-84-crane",
    title: "Carol Lee Maples, 84, of Crane",
    summary: "Celebration of life Friday, August 15, 10-11 AM at Reavisville Baptist Church",
    date: "2025-08-13",
    category: "Death Notices",
    image: "/death-notice.png"
    body: [
      "Carol Lee Maples, 84, of Crane, passed away on August 7, 2025",
      "A celebration of life will be held Friday, August 15 with visitation starting at 10:00 AM and services at 11:00 AM",
      "Final disposition will be cremation under the care of Westrip Funeral Home"
    ],
    links: [
      { label: "Westrip Funeral Home Obituaries", href: "http://www.westripfuneralhome.com/carol-lee-maples-08072025.html" }
    ],
    death: {
      name: "Carol Lee Maples",
      age: 84,
      city: "Crane",
      dateOfDeath: "2025-08-07",
      services: {
        visitation: { at: "Reavisville Baptist Church", when: "Fri, Aug 15, 10-11 AM" },
        funeral: { at: "Reavisville Baptist Church", when: "Fri, Aug 15, 11 AM" }
      },
      source: { label: "Westrip Funeral Home", href: "http://www.westripfuneralhome.com/carol-lee-maples-08072025.html" }
    }
  },
  {
    slug: "broiler-fest-2025",
    title: "Crane Broiler Festival Welcomes Kenny's Funland for Rides",
    summary: "The 2025 Crane Broiler Festival runs Aug. 21-24 at Crane City Park, with Kenny’s Funland providing the carnival rides for the first time.",
    date: "2025-08-12",
    category: "Events",
    image: "/kennys-funland.jpg",
    body: [
      "Crane’s annual Broiler Festival is right around the corner and everybody is eagerly awaiting the delicious chicken, craft booths, fair rides, and all the summer vibes.",
      "This year, the festival has partnered with a new ride provider, Kenny’s Funland, to bring a fresh lineup of amusement rides to Crane City Park. The event runs from Thursday, August 21, through Sunday, August 24, 2025.",
      "Kenny’s Funland will set up and start offering rides on Wednesday evening, continuing through Saturday night. Rides will operate during the following times:",
      "- **Wednesday & Thursday:** 6:00 – 10:00 p.m. ($28 armband)",
      "- **Friday:** 5:00 – 10:00 p.m. ($30 armband)",
      "- **Saturday:** 12:00 – 10:00 p.m. ($35 armband)",
      "Ride armbands can be purchased in advance at several local businesses, including Shelter Insurance, Sunfest Market, Simmons Bank, Stockmens Bank, and Table Rock Community Bank. Riders must be at least 32 inches tall to participate.",
      "In addition to the rides, festivalgoers can enjoy classic Broiler Festival chicken dinners, live entertainment, vendor booths, and the welcoming community atmosphere that has made this event a local favorite for decades."
    ],
    links: [
      { label: "Crane Broiler Festival Facebook", href: "https://www.facebook.com/CraneMoBroilerFestival"}
    ]
    },
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
    },
    {
        slug: "crane-sidewalk-upgrade-2025",
        title: "Sidewalk Upgrade Project Underway in Crane — MoDOT Expects Completion by November",
        summary: "MoDOT begins a $421,722 ADA-compliant sidewalk project along Missouri Route 265 and Stone County Route D, scheduled to finish by November 1, 2025.",
        date: "2025-07-18",
        category: "News",
        image: "/sidewalk-upgrade.jpg",
        body: [
          "Work crews have begun a major sidewalk improvement project in Crane, aimed at upgrading pedestrian access and meeting ADA (Americans with Disabilities Act) standards. The Missouri Department of Transportation (MoDOT) says the work started the week of July 21, 2025 and will continue through early fall.",
          "The project covers two main areas: Missouri Route 265 from North Hemphill Avenue to Stone County Route D, and Stone County Route D from Missouri Route 265 to Pirate Lane.",
          "Upgrades include new sidewalks, paved approaches, crosswalks, curbs, guttering, curb ramps, pavement markings, upgraded signage, and guardrail installation. Temporary gravel driveways will be provided to keep business access open during construction.",
          "Drivers should expect flaggers, lane shifts, and short delays in the work zones. MoDOT urges motorists to slow down, obey posted signs, and watch for workers on site.",
          "The project is being carried out by Hunter Chase & Associates, Inc. of Springfield, which won the contract with a bid of $421,722. Completion is currently scheduled for November 1, 2025.",
          "For more details and updates, visit the official MoDOT project page."
        ],
        links: [
          { label: "MoDOT Project Page", href: "https://www.modot.org/node/71802" }
        ]
      }
]

export function getLatest(n = 6) {
  return [...posts].sort((a,b)=>+new Date(b.date)-+new Date(a.date)).slice(0,n);
}
export function getPost(slug: string) { return posts.find(p => p.slug === slug); }

export function getDeathNotices(n?: number) {
  const all = posts
    .filter(p => p.category === "Death Notices")
    .sort((a,b)=> +new Date(b.date) - +new Date(a.date));
  return typeof n === "number" ? all.slice(0, n) : all;
}
