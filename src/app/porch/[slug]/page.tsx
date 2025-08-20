// app/porch/[slug]/page.tsx
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

// ---- Types
type Category = "Nostalgia" | "Food" | "School" | "Just for Fun" | "Local Spots";
type PorchPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: Category;
  image?: string;
  body: () => React.ReactNode; // <-- FIXED
};

// ---- Seed data (mirror what's on the index page; refactor to a shared module later)
const posts: PorchPost[] = [
  {
    slug: "5-signs-you-grew-up-in-crane",
    title: "5 Signs You Grew Up in Crane",
    excerpt:
      "From Broiler Festival lines to landmark directions — if you know, you know.",
    date: "2025-08-20",
    category: "Nostalgia",
    image: "/porch/grew-up-in-crane.jpg",
    body: PostGrewUpInCrane,
  },
  {
    slug: "7-broiler-festival-foods-that-deserve-a-trophy",
    title: "7 Broiler Festival Foods That Deserve a Trophy 🐔",
    excerpt:
      "Scientific ranking? No. Deliciously biased? Absolutely. Here’s the podium.",
    date: "2025-08-18",
    category: "Food",
    image: "/porch/broiler-foods.jpg",
    body: ComingSoon,
  },
  {
    slug: "8-small-town-things-that-just-make-sense",
    title: "8 Small-Town Things That Just Make Sense",
    excerpt:
      "Giving directions by ‘the old feed store’ and knowing every truck by sound.",
    date: "2025-08-16",
    category: "Just for Fun",
    image: "/porch/small-town-sense.jpg",
    body: ComingSoon,
  },
  {
    slug: "6-crane-high-memories-from-the-bleachers",
    title: "6 Crane High Memories from the Bleachers",
    excerpt:
      "Metal bleachers, nachos, and the ref who ‘needed glasses’ — a love story.",
    date: "2025-08-15",
    category: "School",
    image: "/porch/bleachers.jpg",
    body: ComingSoon,
  },
  {
    slug: "5-hidden-gems-around-stone-county",
    title: "5 Hidden Gems Around Stone County",
    excerpt:
      "Quick drives, great views, and the kind of places you only hear about from a friend.",
    date: "2025-08-12",
    category: "Local Spots",
    image: "/porch/hidden-gems.jpg",
    body: ComingSoon,
  },
];

function getPost(slug: string) {
  return posts.find((p) => p.slug === slug) || null;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ---- Static generation
export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    return { title: "Porch Talk • Crane.news" };
  }
  const url = `https://crane.news/porch/${post.slug}`;
  return {
    title: `${post.title} • Porch Talk`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} • Porch Talk`,
      description: post.excerpt,
      type: "article",
      url,
      images: post.image ? [{ url: post.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} • Porch Talk`,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  };
}

// ---- Page
export default async function PorchPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    // Let Next's notFound() route handle this if you prefer
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <p className="mt-2">
          Head back to <Link href="/porch" className="underline">Porch Talk</Link>.
        </p>
      </main>
    );
  }

  const idx = posts.findIndex((p) => p.slug === post.slug);
  const prev = posts[idx - 1] || null;
  const next = posts[idx + 1] || null;

  // JSON-LD Article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Crane.news" },
    image: post.image ? [`https://crane.news${post.image}`] : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://crane.news/porch/${post.slug}`,
    },
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="prose prose-neutral max-w-none">
        <header className="not-prose mb-6">
          <Link
            href="/porch"
            className="inline-flex items-center text-sm text-gray-600 hover:underline"
          >
            ← Porch Talk
          </Link>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight">
            {post.title}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span className="rounded-full border px-2 py-0.5">{post.category}</span>
            <span>·</span>
            <time dateTime={post.date}>{fmtDate(post.date)}</time>
          </div>
          {post.image ? (
            <div className="mt-4 overflow-hidden rounded-2xl border">
              {/* Replace with next/image if desired */}
              <img
                src={post.image}
                alt={post.title}
                className="h-auto w-full object-cover"
              />
            </div>
          ) : null}
        </header>

        {/* Body */}
        <post.body />

        {/* Share CTA */}
        <div className="not-prose mt-8 rounded-xl border bg-amber-50 p-4">
          <p className="text-sm">
            If this hit your nostalgia bone, share it on Facebook and tag your
            hometown crew! Or{" "}
            <Link href="/porch#submit" className="underline">
              submit your own Porch Talk
            </Link>
            .
          </p>
        </div>

        {/* Prev / Next */}
        <nav className="not-prose mt-10 grid gap-3 sm:grid-cols-2">
          <div>
            {prev ? (
              <Link
                href={`/porch/${prev.slug}`}
                className="block rounded-lg border p-3 hover:bg-gray-50"
              >
                <div className="text-xs text-gray-500">Previous</div>
                <div className="line-clamp-1 font-medium">{prev.title}</div>
              </Link>
            ) : null}
          </div>
          <div className="sm:text-right">
            {next ? (
              <Link
                href={`/porch/${next.slug}`}
                className="block rounded-lg border p-3 hover:bg-gray-50"
              >
                <div className="text-xs text-gray-500">Next</div>
                <div className="line-clamp-1 font-medium">{next.title}</div>
              </Link>
            ) : null}
          </div>
        </nav>
      </article>
    </main>
  );
}

// ---- Bodies ---- //

function PostGrewUpInCrane() {
  return (
    <>
      <p>
        If you grew up in Crane, these will feel less like “signs” and more like
        core memories. Be honest — how many of these are you guilty of? 😅
      </p>

      <h2>1) You’ve Waited at the Broiler Festival Like It’s Black Friday 🐔</h2>
      <ul>
        <li>You can smell the chicken from half a mile away.</li>
        <li>You know which booth has the “good” sweet tea.</li>
        <li>
          You’ve hunted for shade in 100° heat while balancing fried everything.
        </li>
      </ul>
      <blockquote>“See you there next year” — and we all mean it.</blockquote>

      <h2>2) You Give Directions by Landmarks, Not Street Names 🗺️</h2>
      <ul>
        <li>
          “Past the Dollar General, right at the old feed store; if you hit the
          river, you went too far.”
        </li>
        <li>Yes, it’s still “the old” store even two decades later.</li>
      </ul>

      <h2>3) Friday Nights = Crane Pirates Football 🏈</h2>
      <ul>
        <li>Those metal bleachers turned your legs into popsicles.</li>
        <li>Sometimes you went more for nachos and people-watching.</li>
        <li>You remember the first time the whole stadium yelled at a ref.</li>
      </ul>

      <h2>4) You Know the Weather Has a Personal Vendetta 🌪️</h2>
      <ul>
        <li>Sunny to sideways hail in five minutes? Checks out.</li>
        <li>
          You’ve heard the sirens enough to barely look up from your plate.
        </li>
        <li>Bonus points if power blinked during Broiler week.</li>
      </ul>

      <h2>5) News Travels Faster Than Facebook 👀</h2>
      <ul>
        <li>Crane is one big extended family — the grapevine is undefeated.</li>
        <li>Someone knows whose truck was parked where and why.</li>
      </ul>

      <p className="mt-6">
        What did we miss? Drop your favorite Crane memory — and tag the friend
        who’s definitely #3.
      </p>
    </>
  );
}

function ComingSoon() {
  return (
    <>
      <p>
        This Porch Talk story is in the works — got a spicy (but friendly!)
        tip, photo, or memory to add?
      </p>
      <p>
        Send it our way on the{" "}
        <Link href="/porch#submit" className="underline">
          Porch Talk submission form
        </Link>
        .
      </p>
    </>
  );
}
