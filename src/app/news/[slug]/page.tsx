import { notFound } from "next/navigation";
import { posts, getPost } from "@/data/posts";
import Link from "next/link";
import Image from "next/image";
import PostNotes from "@/components/PostNotes";

type SlugParams = { slug: string };

/** Detect a single-line Markdown image: ![alt](src "title") */
function parseImageMd(s: string) {
  // ![alt text](/path/to.jpg "optional title")
  const m = s.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]+)")?\)$/);
  if (!m) return null;
  const [, alt, src, title] = m;
  return { alt: alt?.trim() ?? "", src: src.trim(), title: title?.trim() };
}

function BodyBlock({ text }: { text: string }) {
  const img = parseImageMd(text);
  if (img) {
    return (
      <figure className="my-4">
        <Image
          src={img.src}
          alt={img.alt || img.title || ""}
          width={1200}
          height={675}
          className="w-full h-auto rounded-lg bg-[var(--panel)] object-contain"
        />
        {(img.title || img.alt) && (
          <figcaption className="mt-2 text-xs text-[var(--color-muted)]">
            {img.title || img.alt}
          </figcaption>
        )}
      </figure>
    );
  }

  // default: regular paragraph
  return <p>{text}</p>;
}

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

// Next 15: params is async
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
    ...(p.updatedAt ? { other: { lastModified: p.updatedAt } } : {}),
  };
}

// Next 15: params is async
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
        <div className="flex items-center gap-2">
          <span>Published {new Date(p.date).toLocaleDateString()}</span>
          {p.updatedAt && (
            <>
              <span aria-hidden>•</span>
              <span>Updated {new Date(p.updatedAt).toLocaleDateString()}</span>
            </>
          )}
        </div>
      </div>

      <h1 className="h-serif text-3xl mt-2">{p.title}</h1>

      {/* Hero image with attribution overlay */}
      <div className="relative mt-4 bg-[var(--panel)] rounded-[var(--radius)] overflow-hidden">
        <Image
          src={hero}
          alt={p.title}
          width={1200}
          height={675}
          sizes="(min-width: 1024px) 800px, (min-width: 640px) 600px, 100vw"
          className="w-full h-auto max-h-72 mx-auto object-contain"
          priority
        />
        {p.attribution && (
          <span className="absolute bottom-2 right-2 z-10 text-[10px] leading-none text-white/85 bg-black/50 px-2 py-0.5 rounded">
            {p.attribution}
          </span>
        )}
      </div>

      {/* Updates / Corrections */}
      <PostNotes post={p} />

      {/* Body with image support */}
      <div className="prose mt-4">
        {p.body.map((para, i) => (
          <BodyBlock key={i} text={para} />
        ))}
      </div>

      {/* Optional links box */}
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
    </article>
  );
}
