import { NextResponse } from "next/server";
import { posts } from "@/data/posts";

export async function GET() {
  const pages = ["","news","events","media","about"].map(p => `<url><loc>https://crane.news/${p}</loc></url>`).join("");
  const articles = posts.map(p => `<url><loc>https://crane.news/news/${p.slug}</loc><lastmod>${p.date}</lastmod></url>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages}${articles}</urlset>`;
  return new NextResponse(xml, { headers: { "Content-Type": "application/xml" }});
}
