// 🚫 No "use client" here — server component
import { Suspense } from "react";
import CommunityClient from "./Client";
import { jobs, lostFound } from "@/data/community";

export const metadata = {
  title: "Community — Crane.news",
  description: "Lost & Found and Local Job Board for Crane, MO.",
};

export default function CommunityPage() {
  const lf = [...lostFound].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  const jb = [...jobs].sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return (
    <Suspense fallback={<section className="panel p-4 text-sm">Loading…</section>}>
      <CommunityClient lf={lf} jb={jb} />
    </Suspense>
  );
}
