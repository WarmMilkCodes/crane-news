"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Link from "next/link";
import Image from "next/image";

// Safe, article-friendly markdown with a few overrides
export default function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]]}
      components={{
        a: (props) => {
          const { href, children, ...rest } = props as {
            href?: string;
            children?: React.ReactNode;
          };
          if (!href) return <span {...rest}>{children}</span>;
          const isExternal = /^https?:\/\//i.test(href);

          return isExternal ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-2 underline-offset-2 hover:opacity-80"
              {...rest}
            >
              {children}
            </a>
          ) : (
            <Link
              href={href}
              className="underline decoration-2 underline-offset-2 hover:opacity-80"
            >
              {children}
            </Link>
          );
        },

        img: (props) => {
          // ReactMarkdown types src as string | Blob; Next/Image needs string | StaticImport
          const { src, alt = "", title } = props as {
            src?: string | Blob;
            alt?: string;
            title?: string;
          };

          let srcStr: string | null = null;
          if (typeof src === "string") srcStr = src;
          else if (src instanceof Blob) srcStr = URL.createObjectURL(src);

          if (!srcStr) return null;

          const isLocal = srcStr.startsWith("/");

          return isLocal ? (
            <figure className="my-6">
              <Image
                src={srcStr} // guaranteed string here
                alt={alt}
                title={title}
                width={1600}
                height={900}
                className="rounded-xl shadow-md w-full h-auto"
              />
              {alt && (
                <figcaption className="mt-2 text-sm text-gray-500">{alt}</figcaption>
              )}
            </figure>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={srcStr}
              alt={alt}
              title={title}
              className="my-6 rounded-xl shadow-md"
            />
          );
        },

        // Make paragraphs and lists look like an article
        p: ({ children }) => <p className="my-4 leading-7">{children}</p>,
        ul: ({ children }) => (
          <ul className="my-4 list-disc pl-6 space-y-1">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="my-4 list-decimal pl-6 space-y-1">{children}</ol>
        ),
        blockquote: ({ children }) => (
          <blockquote className="my-4 border-l-4 pl-4 italic text-gray-700">
            {children}
          </blockquote>
        ),
        h2: ({ children }) => (
          <h2 className="mt-10 mb-3 text-2xl font-extrabold">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-8 mb-2 text-xl font-bold">{children}</h3>
        ),
        strong: ({ children }) => <strong className="font-extrabold">{children}</strong>,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
