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

export const lostFound: LostFoundPost[] = [];

export const jobs: JobPost[] = [];
