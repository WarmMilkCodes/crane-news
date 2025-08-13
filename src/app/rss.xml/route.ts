import { NextResponse } from "next/server";
import { posts } from "@/data/posts";

export async function GET() {
  const items = posts
    .sort((a,b)=>+new Date(b.date)-+new Date(a.date))
    .map(p => `
      <item>
        <title>${escape(p.title)}</title>
        <link>https://crane.news/news/${p.slug}</link>
        <pubDate>${new Date(p.date).toUTCString()}</pubDate>
        <description>${escape(p.summary)}</description>
        <guid>https://crane.news/news/${p.slug}</guid>
      </item>`
    ).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0"><channel>
    <title>Crane.news</title>
    <link>https://crane.news/</link>
    <description>Local news, events, and media for Crane, Missouri.</description>
    ${items}
  </channel></rss>`;
  return new NextResponse(xml, { headers: { "Content-Type": "application/rss+xml" }});
}
function escape(s:string){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
