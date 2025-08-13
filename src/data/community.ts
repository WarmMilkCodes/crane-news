export type Board = "lost-found" | "jobs";

export type PostBase = {
  id: string;
  title: string;
  date: string;              // ISO
  contact?: string;          // email/phone/link
  location?: string;         // free text
  image?: string;            // /community/*.jpg
  notes?: string;            // extra details
};

export type LostFoundPost = PostBase & {
  type: "Lost" | "Found";
  category: "Pet" | "Keys" | "Wallet" | "Phone" | "Other";
};

export type JobPost = PostBase & {
  company: string;
  type: "Full-time" | "Part-time" | "Seasonal" | "Contract";
  pay?: string;              // "$14–$16/hr", "DOE"
};

export const lostFound: LostFoundPost[] = [
  {
    id: "lf-2025-08-12-tabby",
    type: "Lost",
    category: "Pet",
    title: "Lost gray tabby near City Park",
    date: "2025-08-12",
    contact: "555-555-0134",
    location: "Crane City Park area",
    notes: "Answers to 'Milo'. Green collar. Friendly.",
  },
];

export const jobs: JobPost[] = [
  {
    id: "job-2025-08-10-market-cashier",
    company: "Sunfest Market",
    type: "Part-time",
    title: "Cashier / Front End",
    date: "2025-08-10",
    contact: "apply in-store",
    notes: "Evenings & weekends. Great for students.",
    pay: "$13–$15/hr",
  },
];
