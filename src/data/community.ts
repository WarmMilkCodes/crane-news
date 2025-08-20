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

export const jobs: JobPost[] = [
  {
    id: "crane-r3-paraprofessional-2025-08",
    title: "Special Education Paraprofessional",
    company: "Crane R-III School District",
    type: "Full-time",
    date: "2025-08-19",
    location: "Crane, MO",
    image: "/crane-pirate-logo.jpg",
    notes: "Crane Schools is hiring a special education paraprofessional to support elementary and secondary classrooms. School-year schedule; assists teachers with student support and classroom tasks. See the district website for requirements to apply.",
    contact: "https://crane.tedk12.com/hire/ViewJob.aspx?JobID=208"
  }
];
