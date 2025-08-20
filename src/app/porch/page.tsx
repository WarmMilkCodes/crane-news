// app/porch/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 3600; // 1h: porch posts won't change every minute

export const metadata: Metadata = {
  title: "Porch Talk • Crane.news",
  description:
    "Light, local, and shareable: Porch Talk is Crane.news’ home for listicles, memories, and community stories.",
  openGraph: {
    title: "Porch Talk • Crane.news",
    description:
      "Light, local, and shareable: Porch Talk is Crane.news’ home for listicles, memories, and community stories.",
    type: "website",
    url: "https://crane.news/porch",
    images: [{ url: "/og/porch-talk.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Porch Talk • Crane.news",
    description:
      "Light, local, and shareable: Porch Talk is Crane.news’ home for listicles, memories, and community stories.",
    images: ["/og/porch-talk.png"],
  },
};

type PorchPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  category: "Nostalgia" | "Food" | "School" | "Just for Fun" | "Local Spots";
  image?: string;
};

// Seed content (replace with DB/CMS later)
const posts: PorchPost[] = [
  {
    slug: "5-signs-you-grew-up-in-crane",
    title: "5 Signs You Grew Up in Crane",
    excerpt:
      "From Broiler Festival lines to landmark directions — if you know, you know.",
    date: "2025-08-20",
    category: "Nostalgia",
    image: "/porch/grew-up-in-crane.jpg",
  },
  {
    slug: "7-broiler-festival-foods-that-deserve-a-trophy",
    title: "7 Broiler Festival Foods That Deserve a Trophy 🐔",
    excerpt:
      "Scientific ranking? No. Deliciously biased? Absolutely. Here’s the podium.",
    date: "2025-08-18",
    category: "Food",
    image: "/porch/broiler-foods.jpg",
  },
  {
    slug: "8-small-town-things-that-just-make-sense",
    title: "8 Small-Town Things That Just Make Sense",
    excerpt:
      "Giving directions by ‘the old feed store’ and knowing every truck by sound.",
    date: "2025-08-16",
    category: "Just for Fun",
    image: "/porch/small-town-sense.jpg",
  },
  {
    slug: "6-crane-high-memories-from-the-bleachers",
    title: "6 Crane High Memories from the Bleachers",
    excerpt:
      "Metal bleachers, nachos, and the ref who ‘needed glasses’ — a love story.",
    date: "2025-08-15",
    category: "School",
    image: "/porch/bleachers.jpg",
  },
  {
    slug: "5-hidden-gems-around-stone-county",
    title: "5 Hidden Gems Around Stone County",
    excerpt:
      "Quick drives, great views, and the kind of places you only hear about from a friend.",
    date: "2025-08-12",
    category: "Local Spots",
    image: "/porch/hidden-gems.jpg",
  },
];

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function PorchTalkPage() {
  const categories = Array.from(new Set(posts.map((p) => p.category)));

  // JSON-LD for ItemList (SEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Porch Talk • Crane.news",
    description:
      "Light, local, and shareable: listicles, memories, and community stories from Crane, MO.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://crane.news/porch/${p.slug}`,
        name: p.title,
      })),
    },
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="mb-10 rounded-2xl border bg-gradient-to-br from-amber-50 to-white p-6">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Porch Talk
        </h1>
        <p className="mt-2 text-[var(--muted-foreground,#555)]">
          Light, local, and shareable — listicles, memories, and community
          stories. No drama, just Crane being Crane.
        </p>

        {/* House Rules */}
        <div className="mt-6 grid gap-4 rounded-xl border bg-white p-4 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide">
              House Rules
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              <li>Keep it positive or playful. No gossip or personal attacks.</li>
              <li>No full names for negative anecdotes. Protect neighbors.</li>
              <li>We lightly moderate for tone and safety.</li>
            </ul>
          </div>
          <div className="rounded-lg border bg-amber-50 p-3 text-sm">
            Want to contribute? Share a memory, list, or “only in Crane” moment
            below. Short and fun works best!
          </div>
        </div>
      </section>

      {/* Quick Filters */}
      <section className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-600">Browse:</span>
        <Link
          href="/porch"
          className="rounded-full border px-3 py-1 text-sm hover:bg-gray-50"
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c}
            href={`/porch?cat=${encodeURIComponent(c)}`}
            className="rounded-full border px-3 py-1 text-sm hover:bg-gray-50"
          >
            {c}
          </Link>
        ))}
        <a
          href="#submit"
          className="ml-auto rounded-full bg-black px-4 py-1.5 text-sm font-medium text-white hover:opacity-90"
        >
          Submit a Story
        </a>
      </section>

      {/* Posts grid */}
      <section className="grid gap-6 sm:grid-cols-2">
        {posts.map((p) => (
          <article
            key={p.slug}
            className="group overflow-hidden rounded-2xl border bg-white"
          >
            <Link href={`/porch/${p.slug}`} className="block">
              <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100">
                {/* Use next/image if you prefer; plain img keeps this file self-contained */}
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                ) : null}
              </div>
              <div className="p-4">
                <div className="mb-1 flex items-center gap-2 text-xs text-gray-500">
                  <span className="rounded-full border px-2 py-0.5">
                    {p.category}
                  </span>
                  <span>·</span>
                  <time dateTime={p.date}>{fmtDate(p.date)}</time>
                </div>
                <h3 className="text-lg font-semibold leading-tight group-hover:underline">
                  {p.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                  {p.excerpt}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </section>

      {/* Submission form */}
      <section id="submit" className="mt-12">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold">Submit to Porch Talk</h2>
          <span className="text-sm text-gray-500">Friendly & family-safe only</span>
        </div>

        {/*
          ACTION NOTES:
          - Point this form to your API route or Formspree when ready.
          - Example API route: /app/api/porch/submit/route.ts (POST)
        */}
        <form
          action="/api/porch/submit"
          method="POST"
          className="grid gap-4 rounded-2xl border bg-white p-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="title">
                Title (short + catchy)
              </label>
              <input
                id="title"
                name="title"
                required
                maxLength={80}
                placeholder="5 Signs You Grew Up in Crane"
                className="w-full rounded-lg border px-3 py-2"
              />
            </div>
            <div>
              <label
                className="mb-1 block text-sm font-medium"
                htmlFor="category"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                className="w-full rounded-lg border px-3 py-2"
                defaultValue="Nostalgia"
              >
                <option>Nostalgia</option>
                <option>Food</option>
                <option>School</option>
                <option>Local Spots</option>
                <option>Just for Fun</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="body">
              Your story / list (keep it light & local)
            </label>
            <textarea
              id="body"
              name="body"
              required
              rows={6}
              placeholder="Bullet your list (5–10 items) or write 1–3 short paragraphs."
              className="w-full rounded-lg border px-3 py-2"
            />
            <p className="mt-1 text-xs text-gray-500">
              Tip: Short, funny, and specific = most likely to be featured.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="name">
                Your name (optional)
              </label>
              <input
                id="name"
                name="name"
                placeholder="First name or nickname"
                className="w-full rounded-lg border px-3 py-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="email">
                Email (optional, stays private)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="So we can follow up"
                className="w-full rounded-lg border px-3 py-2"
              />
            </div>
          </div>

          <div className="flex items-start gap-2">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              required
              className="mt-1"
            />
            <label htmlFor="consent" className="text-sm">
              I confirm this submission follows the House Rules (no gossip, no
              personal attacks, no doxxing). Crane.news may edit for clarity and
              length.
            </label>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Submit Story
            </button>
            <p className="text-xs text-gray-500">
              We’ll review and publish selected submissions.
            </p>
          </div>
        </form>
      </section>

      {/* Footer CTA */}
      <section className="mt-10 rounded-2xl border bg-gray-50 p-4 text-center text-sm text-gray-600">
        Want instant updates when new Porch Talk posts drop?{" "}
        <Link href="/subscribe" className="underline">
          Subscribe by email
        </Link>{" "}
        and follow us on Facebook.
      </section>
    </main>
  );
}
