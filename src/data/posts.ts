export type PostLink = { label: string; href: string }

export type PostNoteType = "update" | "correction" | "editor_note";

export type PostNote = {
  type: PostNoteType;
  date: string;       // ISO
  text: string;       // brief, mark-down friedly
  byline?: string;    // e.g. "Editor: name"
  links?: PostLink[]; // Optional sources
};

export type Post = {
  slug: string;
  title: string;
  author?: string;
  summary: string;
  date: string;         // original publish date (ISO)
  updatedAt?: string;   // last updated date (ISO)
  image?: string;       // /news/*.jpg
  attribution?: string; // e.g. "Photo @ 417 Magazine"
  category?: string;    // "News" | "Events" | "School" | ...
  body: string[];
  links?: PostLink[];  // source URLs
  notes?: PostNote[];
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
    slug: "broiler-festival-events-schedule-2025",
    title: "Broiler Festival Schedule of Events",
    summary: "The Crane Broiler Festival has released the schedule of events, including booth operation times, music lineup, and more.",
    date: "2025-08-18",
    image: "/broiler-festival-events",
    category: "News",
    body: [
      "The Crane Broiler Festival is sure to have another successful year, and they have put on their schedule of events so you don't miss out any of the fun.",
      "As a reminder the Broiler Festival serves chicken on Friday and Saturday only.",
      "You have until Wednesday to get a discounted wristband that is good for your night of choice.",
      "![2025 Broiler Festival Schedule of Events](/b-fest-schedule.jpg)"
    ],
    links: [
      { label: "Crane Broiler Festival Facebook", href: "https://www.facebook.com/CraneMoBroilerFestival" }
    ]

  },
  {
    slug: "crane-elementary-dropoff-pickup-2025",
    title: "Crane Elementary Drop-Off & Pick-Up Procedures Announced",
    summary: "Crane School District outlines morning drop-off at the elementary front and K-6 afternoon pick-up around back. Except heavy traffic the first few days.",
    date: "2025-08-18",
    category: "School",
    image: "/crane-school-map.jpg",
    attribution: "Photo @ Crane School District",
    body: [
    "As the new school year begins, Crane R-III Schools have released updated procedures for Elementary drop-off and pick-up.",
    "Morning drop-off: All Elementary students (including Preschoolers) should be dropped off at the front of the Elementary using the marked traffic arrows.",
    "Afternoon pick-up: Preschoolers are picked up at the front. Students in grades K–6 should be picked up in the Parent Pick-Up Line behind the school.",
    "Traffic notice: The district expects heavy traffic and long car lines during the first few days. To help reduce congestion, older Elementary students who eat breakfast may be dropped off at the High School doors.",
    "First-day exception: Parents of Preschool and Kindergarten students may walk their child into the building to the JH Gym on the first day only.",
    "The district adds: “We can’t wait to see you all on Tuesday!”",
    "![Drop-off map](/crane-school-map.jpg \"Traffic flow for the first week\")"
  ],
  links: [
    {label: "Crane R-III Schools Facebook", href: "https://www.facebook.com/profile.php?id=100063582670446"}
  ]
  },
  {
    slug: "crane-school-paywat",
    title: "Crane Schools Offering Online Meal Payment With Paywat",
    summary: "No need to send money to school with your child, Crane Schools now offers online payments using Paywat.",
    date: "2025-08-16",
    category: "School",
    image: "/paywat.jpg",
    attribution: "Photo @ Crane School District",
    body: [
    "Crane families now have a more convenient way to stay on top of their children’s meal and snack milk accounts. The school district has partnered with **Paywat**, a secure online payment system, to let parents add funds anytime without having to send money with students or stop by the office.",
    "School officials say the new system is intended to cut down on forgotten lunch money, reduce the amount of cash being handled at school, and give families an easy way to track balances. Parents can log in from a phone or computer, see their child’s current account, and make payments directly.",
    "A short instructional video has been posted to walk families through the setup process step by step. The video shows how to access the Paywat portal, link a student’s account, and add funds in just a few clicks.",
    "The district encourages all families to try the new tool before the school year gets underway to avoid first-day lunch line delays. Traditional payment methods will still be accepted, but staff say Paywat is designed to make things faster and easier for everyone.",
    "For more details, watch the district’s video tutorial linked below and follow the prompts to get started."
  ],
  links: [
      { label: "Paywat Instruction Video", href: "https://drive.google.com/file/d/1bJu22asqlDnW2JLY2QbJCXA3fg94HZwp/view?fbclid=IwY2xjawMNmzNleHRuA2FlbQIxMABicmlkETFmMTcyb2d2SGtua3BJcERFAR7gIzzbEXYbZX5jNutg8N2r5NfEClkYFdgKaqWXD02bK1m8YS6UzO-9_9L9rQ_aem_A_FywkpYyqDwjPl6p3J5eA" }
    ]
  },
  {
    slug: "brightspeed-fiber-coming-to-crane",
    title: "Brightspeed Fiber Coming to Crane",
    summary: "Mayor Collin Brannan says construction is expected to begin soon, bringing a new high-speed internet option to Crane with symmetrical upload and download speeds.",
    date: "2025-08-14",
    category: "News",
    image: "/brightspeed-logo.png",
    attribution: "Photo @ Brightspeed",
    body: [
      "Crane residents may soon have a new choice for high-speed internet. Mayor Collin Brannan confirmed that the city has received several utility locates, which he says is a strong sign that Brightspeed Fiber construction will begin in the near future.",
      "Brightspeed — formerly known as CenturyLink — has provided basic DSL internet and phone service in Crane for decades. Following the buyout of CenturyLink, Brightspeed has been rolling out fiber upgrades to more rural communities across the region.",
      "Currently, Mediacom is the only wired internet service provider in town — excluding satellite services — delivering internet over coaxial cable. While Mediacom advertises download speeds up to 1 gigabit per second (Gbps), upload speeds top out around 50 megabits per second (Mbps). Although the company’s MoCA technology could theoretically allow for faster speeds, Mediacom has not made those options available locally.",
      "Fiber internet, by contrast, can support speeds up to 10 Gbps. Brightspeed’s website lists plans up to 2 Gbps for certain areas, with the advantage of symmetrical speeds — meaning the upload speed matches the download speed — which is especially beneficial for video calls, online learning, cloud backups, and content creation.",
      "The arrival of Brightspeed Fiber would mark a significant upgrade to Crane’s internet infrastructure, offering faster and more balanced connectivity for homes and businesses alike.",
      "We'll continue to follow this story as construction begins."
    ],
    notes :[
      {
        type: "update",
        date: "2025-08-16",
        text:
        "Crane News will be the **first** Brightspeed fiber customer in Crane. We'll publish side-by-side tests comparing current **Mediacom 1 Gbps (≈1000/50)** versus **Brightspeed 2 Gbps (≈2000/2000)** after installation.",
        byline: "Editor"
      }
    ]
  },
  {
    slug: "kenny-vaught-commissioner-application",
    title: "Stone County Presiding Commissioner Steps Down; Replacement Process Underway",
    summary: "An unexpected resignation has a left a vacancy on the Stone County Commission, and at least one Crane resident is stepping forward to seek the role.",
    date: "2025-08-13",
    category: "News",
    image: "/kenny-vaught.jpg",
    attribution: "Photo @ Kenny Vaught",
    body: [
      "An unexpected resignation has left a vacancy on the Stone County Commission, and at least one local resident is stepping forward to seek the role.",
      "At the commission’s meeting on Tuesday, July 15, 2025, Presiding Commissioner Mark Maples announced he would be resigning and handed the meeting over to Presiding Commissioner Pro Tempore Hank Smythe. The position is now open, and Governor Mike Kehoe’s office will be accepting applications for the appointment.",
      "Crane resident Kenny Vaught has already declared his intent to apply. In a statement on social media, Vaught shared that he has worked in road construction and consulting since 1980, serving multiple counties and assisting with FEMA disaster response efforts. A lifelong Stone County resident, Vaught said he is committed to the community’s growth and wants to ensure citizens’ voices are heard.",
      "Stone County Clerk Denise Dickens explained that anyone interested in applying must go through the Missouri Governor’s “Boards and Commissions” office. “When the position is posted there, applicants can submit their information through the Governor’s application process,” Dickens said.",
      "Following his announcement, Maples provided a resignation letter to the Stone County Republican, stating his departure would be effective July 31, 2025. In the letter, Maples reflected on his service since first running for Northern Commissioner in 2011, describing the role as “one of the greatest honors” of his professional life. He thanked county employees, fellow officials, and residents for their trust, writing that it was time “to step aside and allow for other leadership.”",
      "Until the governor names a replacement, Smythe will continue presiding over commission meetings."
    ]
  },
  {
    slug: "obit-carol-maples-84-crane",
    title: "Carol Lee Maples, 84, of Crane",
    summary: "Celebration of life Friday, August 15, 10-11 AM at Reavisville Baptist Church",
    date: "2025-08-13",
    category: "Death Notices",
    image: "/death-notice.png",
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
    attribution: "Photo @ Kenny's Funland",
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
        attribution: "Photo @ Crane School District",
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

// ---------- helpers ----------
export function getLatest(n = 6) {
  // Prefer updatedAt for recency if present
  return [...posts]
    .sort((a, b) => +new Date((b.updatedAt ?? b.date)) - +new Date((a.updatedAt ?? a.date)))
    .slice(0, n);
}
export function getPost(slug: string) { return posts.find(p => p.slug === slug); }

export function getDeathNotices(n?: number) {
  const all = posts
    .filter(p => p.category === "Death Notices")
    .sort((a,b)=> +new Date(b.date) - +new Date(a.date));
  return typeof n === "number" ? all.slice(0, n) : all;
}

export function latestNote(p: Post) {
  if (!p.notes?.length) return null;
  return [...p.notes].sort((a,b)=>+new Date(b.date)-+new Date(a.date))[0];
}
export function noteLabel(t: PostNoteType) {
  if (t === "update") return "Update";
  if (t === "correction") return "Correction";
  return "Editor’s note";
}
