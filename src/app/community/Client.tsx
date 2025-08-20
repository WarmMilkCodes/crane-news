"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { JobPost, LostFoundPost } from "@/data/community";

type Props = { lf: LostFoundPost[]; jb: JobPost[] };
type TabKey = "lost-found" | "jobs";

function LostFoundCard({ p }: { p: LostFoundPost }) {
  return (
    <div id={`lf-${p.id}`} className="card p-4">
      <div className="flex items-center justify-between">
        <a href={`#lf-${p.id}`} className="h-serif text-lg underline-offset-2 hover:underline">
          {p.title}
        </a>
        <span className="tag tag--gold">{p.type}</span>
      </div>
      <div className="text-xs text-[var(--color-muted)]">
        {new Date(p.date).toLocaleDateString()} · {p.category}
        {p.location ? ` · ${p.location}` : ""}
      </div>
      {p.notes && <p className="mt-2 text-sm">{p.notes}</p>}
      <div className="mt-2 text-sm">
        {p.contact && <span className="text-[var(--color-muted)]">Contact: {p.contact}</span>}
      </div>
    </div>
  );
}

function toContactHref(raw?: string) {
  if (!raw) return undefined;
  const s = raw.trim();

  if (/^https?:\/\//i.test(s)) return s;                 // URL
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return `mailto:${s}`; // Email

  // Phone (forgiving)
  if (/^[+()\-\s.\d]{7,}$/.test(s)) {
    const digits = s.replace(/[^\d+]/g, "");
    return `tel:${digits}`;
  }

  return `https://${s}`; // fallback
}

function JobCard({ p }: { p: JobPost }) {
  const href = toContactHref(p.contact);
  return (
    <div id={`job-${p.id}`} className="card p-4">
      <div className="flex items-center justify-between">
        <a href={`#job-${p.id}`} className="h-serif text-lg underline-offset-2 hover:underline">
          {p.title}
        </a>
        <span className="tag tag--gold">{p.type}</span>
      </div>

      <div className="text-xs text-[var(--color-muted)]">
        {new Date(p.date).toLocaleDateString()} · {p.company}
        {p.location ? ` · ${p.location}` : ""}
      </div>

      {p.notes && <p className="mt-2 text-sm">{p.notes}</p>}

      <div className="mt-2 text-sm flex items-center gap-3">
        {p.pay && <span className="font-medium">{p.pay}</span>}
        {href && (
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="underline"
          >
            View details / Apply →
          </a>
        )}
      </div>
    </div>
  );
}

export default function CommunityClient({ lf, jb }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [tab, setTab] = useState<TabKey>("lost-found");

  // Init tab from ?tab= or #jobs / #lost-found / #job-... / #lf-...
  useEffect(() => {
    const spTab = (searchParams.get("tab") as TabKey | null) ?? null;
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";

    let initial: TabKey = "lost-found";
    if (spTab === "jobs" || spTab === "lost-found") {
      initial = spTab;
    } else if (hash === "jobs" || hash.startsWith("job-")) {
      initial = "jobs";
    } else if (hash === "lost-found" || hash.startsWith("lf-")) {
      initial = "lost-found";
    }
    setTab(initial);

    // If a specific card id is present, scroll to it after render
    if (hash && (hash.startsWith("job-") || hash.startsWith("lf-"))) {
      // small timeout to ensure layout is painted
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  // When user clicks a tab, update both state and URL (?tab=...)
  function switchTab(next: TabKey) {
    setTab(next);
    const sp = new URLSearchParams(Array.from(searchParams.entries()));
    sp.set("tab", next);
    // Drop any hash that might conflict with the new tab
    router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
  }

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="h-serif text-2xl">Community</h1>
        <p className="text-sm text-[var(--color-muted)]">Lost &amp; Found and Local Job Board.</p>
        <div className="panel p-3 text-xs text-[var(--color-muted)]">
          Posting something? <a href="/submit" className="underline">Use our submit form</a>. Posts are moderated.
        </div>
      </header>

      {/* Shareable quick anchors for tabs */}
      <nav className="text-xs text-[var(--color-muted)] -mb-2">
        <a href="#lost-found" className="underline mr-3">Link to Lost & Found</a>
        <a href="#jobs" className="underline">Link to Jobs</a>
      </nav>

      <div className="flex gap-2">
        <button
          className={`panel px-3 py-2 text-sm ${tab === "lost-found" ? "ring-1 ring-[var(--color-accent,#22d3ee)]" : ""}`}
          onClick={() => switchTab("lost-found")}
        >
          Lost &amp; Found
        </button>
        <button
          className={`panel px-3 py-2 text-sm ${tab === "jobs" ? "ring-1 ring-[var(--color-accent,#22d3ee)]" : ""}`}
          onClick={() => switchTab("jobs")}
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
