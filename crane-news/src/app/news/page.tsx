import { posts } from "@/data/posts";
import { PostCard } from "@/components/PostCard";

export const metadata = { title: "News — Crane.news" };

export default function NewsPage() {
  const sorted = [...posts].sort((a,b)=>+new Date(b.date)-+new Date(a.date));
  return (
    <section className="space-y-4">
      <h1 className="h-serif text-2xl">News</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map(p => <PostCard key={p.slug} {...p} />)}
      </div>
    </section>
  );
}
