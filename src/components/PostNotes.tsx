"use client";

import type { Post } from "@/data/posts";

function badgeClasses(type: string) {
  if (type === "correction") return "bg-red-50 text-red-700 ring-1 ring-red-200";
  if (type === "update") return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
  return "bg-blue-50 text-blue-700 ring-1 ring-blue-200"; // editor_note/default
}

function label(type: string) {
  if (type === "correction") return "Correction";
  if (type === "update") return "Update";
  return "Editor’s note";
}

export default function PostNotes({ post }: { post: Post }) {
  if (!post?.notes?.length) return null;

  const notes = [...post.notes].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date)
  );

  return (
    <section className="mt-4">
      <div className="rounded-[var(--radius)] border border-black/5 bg-[var(--panel)] p-4">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-black/10 bg-white/60 px-2 py-0.5 text-xs font-medium">
            Updates &amp; Corrections
          </span>
          {post.updatedAt && (
            <span className="text-xs text-[var(--color-muted)]">
              Last updated {new Date(post.updatedAt).toLocaleDateString()}
            </span>
          )}
        </div>

        <ul className="space-y-3">
          {notes.map((n, i) => (
            <li key={i} className="rounded-lg bg-white p-3 ring-1 ring-black/5">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${badgeClasses(
                    n.type
                  )}`}
                  title={label(n.type)}
                >
                  {label(n.type)}
                </span>
                <time className="text-xs text-[var(--color-muted)]">
                  {new Date(n.date).toLocaleString()}
                </time>
                {n.byline && (
                  <span className="text-xs text-[var(--color-muted)]">• {n.byline}</span>
                )}
              </div>

              <div className="prose prose-sm max-w-none">
                <p>{n.text}</p>

                {!!n.links?.length && (
                  <ul className="mt-2 list-inside list-disc">
                    {n.links.map((l, idx) => (
                      <li key={idx}>
                        <a
                          className="underline"
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {l.label ?? l.href}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
