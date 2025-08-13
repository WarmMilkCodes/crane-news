// 🚫 No "use client" here — server component
import CommunityClient from "./Client";
import { jobs, lostFound } from "@/data/community";

export const metadata = {
  title: "Community — Crane.news",
  description: "Lost & Found and Local Job Board for Crane, MO.",
};

export default function CommunityPage() {
  // Sort on the server so the client just renders
  const lf = [...lostFound].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  const jb = [...jobs].sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return <CommunityClient lf={lf} jb={jb} />;
}
