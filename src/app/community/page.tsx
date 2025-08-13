"use client";

import { useMemo, useState } from "react";
import { jobs, lostFound, type JobPost, type LostFoundPost } from "@/data/community";

export const metadata = {
  title: "Community — Crane.news",
  description: "Lost & Found and Local Job Board for Crane, MO.",
};

type TabKey = "lost-found" | "jobs";

function LostFoundCard({ p }: { p: LostFoundPost }) {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <div className="h-serif text-lg">{p.title}</div>
        <span className="tag tag--gold">{p.type}</span>
      </div>
      <div className="text-xs text-[var(--color-muted)]">
        {new Date(p.date).toLocaleDateString()} · {p.category}{p.location ? ` · ${p.location}` : ""}
      </div>
      {p.notes && <p className="mt-2 text-sm">{p.notes}</p>}
      <div className="mt-2 text-sm">
        {p.contact && <span className="text-[var(--color-muted)]">Contact: {p.contact}</span>}
      </div>
    </div>
  );
}

function JobCard({ p }: { p: JobPost }) {
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <div className="h-serif text-lg">{p.title}</div>
        <span className="tag tag--gold">{p.type}</span>
      </div>
      <div className="text-xs text-[var(--color-muted)]">
        {new Date(p.date).toLocaleDateString()} · {p.company}{p.location ? ` · ${p.location}` : ""}
      </div>
      {p.notes && <p className="mt-2 text-sm">{p.notes}</p>}
      <div className="mt-2 text-sm flex items-center gap-3">
        {p.pay && <span className="font-medium">{p.pay}</span>}
        {p.contact && <span className="text-[var(--color-muted)]">Apply: {p.contact}</span>}
      </div>
    </div>
  );
}

export default function CommunityPage() {
  const [tab, setTab] = useState<TabKey>("lost-found");

  const lf = useMemo(
    () => [...lostFound].sort((a, b) => +new Date(b.date) - +new Date(a.date)),
    []
  );
  const jb = useMemo(
    () => [...jobs].sort((a, b) => +new Date(b.date) - +new Date(a.date)),
    []
  );

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="h-serif text-2xl">Community</h1>
        <p className="text-sm text-[var(--color-muted)]">Lost & Found and Local Job Board.</p>
        <div className="panel p-3 text-xs text-[var(--color-muted)]">
          Posting something? <a href="/submit" className="underline">Use our submit form</a>. Posts are moderated.
        </div>
      </header>

      <div className="flex gap-2">
        <button
          className={`panel px-3 py-2 text-sm ${tab === "lost-found" ? "ring-1 ring-[var(--color-accent,#22d3ee)]" : ""}`}
          onClick={() => setTab("lost-found")}
        >
          Lost &amp; Found
        </button>
        <button
          className={`panel px-3 py-2 text-sm ${tab === "jobs" ? "ring-1 ring-[var(--color-accent,#22d3ee)]" : ""}`}
          onClick={() => setTab("jobs")}
        >
          Jobs
        </button>
      </div>

      {tab === "lost-found" ? (
        <section className="grid md:grid-cols-2 gap-3">
          {lf.length ? lf.map(p => <LostFoundCard key={p.id} p={p} />) : (
            <div className="panel p-3 text-sm">No posts yet.</div>
          )}
        </section>
      ) : (
        <section className="grid md:grid-cols-2 gap-3">
          {jb.length ? jb.map(p => <JobCard key={p.id} p={p} />) : (
            <div className="panel p-3 text-sm">No job posts yet.</div>
          )}
        </section>
      )}
    </section>
  );
}
