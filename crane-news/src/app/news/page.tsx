import { posts } from "@/data/posts";
import { PostCard } from "@/components/PostCard";

export const metadata = { title: "News — Crane.news" };

export default function NewsPage() {
  const sorted = [...posts].sort((a,b)=>+new Date(b.date)-+new Date(a.date));
  return (
    <section className="card p-6 md:p-8">
      <h1 className="text-xl md:text-2xl font-semibold">News</h1>
      <div className="mt-4 grid md:grid-cols-2 gap-4">
        {sorted.map(p => <PostCard key={p.slug} {...p} />)}
      </div>
    </section>
  );
}
