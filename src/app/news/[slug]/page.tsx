import { notFound } from "next/navigation";
import { posts, getPost } from "@/data/posts";
import Link from "next/link";
import Image from "next/image";

type SlugParams = { slug: string };

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

// 👇 Next 15: params is async
export async function generateMetadata({
  params,
}: {
  params: Promise<SlugParams>;
}) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  const img = p.image ?? "/og-default.jpg";
  return {
    title: `${p.title} — Crane.news`,
    description: p.summary,
    openGraph: {
      title: p.title,
      description: p.summary,
      images: [img],
      url: `https://crane.news/news/${p.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: p.title,
      description: p.summary,
      images: [img],
    },
  };
}

// 👇 Next 15: params is async
export default async function Article({
  params,
}: {
  params: Promise<SlugParams>;
}) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return notFound();

  const hero = p.image ?? "/header.jpg";

  return (
    <article className="card p-6 md:p-8">
      <Link href="/news" className="btn-plain mb-4 inline-flex">
        ← Back to News
      </Link>

      <div className="flex items-center justify-between text-xs text-[var(--color-muted)]">
        <span className="tag tag--gold">{p.category ?? "News"}</span>
        <span>{new Date(p.date).toLocaleDateString()}</span>
      </div>

      <h1 className="h-serif text-3xl mt-2">{p.title}</h1>

      <div className="mt-4">
      <Image
        src={hero}
        alt={p.title}
        width={1200}                 // intrinsic size (any reasonable values)
        height={675}
        sizes="(min-width: 1024px) 800px, (min-width: 640px) 600px, 100vw"
        className="w-full h-auto max-w-3xl mx-auto rounded-[var(--radius)] shadow"
        priority
      />
    </div>


      <div className="prose mt-4">
        {p.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {/* Optional links box if you added p.links */}
      {Array.isArray(p.links) && p.links.length > 0 && (
        <div className="panel p-4 mt-6">
          <div className="h-serif text-lg mb-2">Sources &amp; official links</div>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {p.links.map((l, i) => {
              const label = l.label ?? l.href.replace(/^https?:\/\//, "");
              const external = /^https?:\/\//i.test(l.href);
              return external ? (
                <li key={i}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {label}
                  </a>{" "}
                  <span className="text-[var(--color-muted)]">(opens in new tab)</span>
                </li>
              ) : (
                <li key={i}>
                  <Link href={l.href} className="underline">
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="mt-6 text-sm text-[var(--color-muted)]">
        ❤️ {p.likes ?? 0} • 💬 {p.comments ?? 0} (interactions coming soon)
      </div>
    </article>
  );
}
