import HeroHeader from "@/components/HeroHeader";
import { AlertBar } from "@/components/AlertBar";
import { getLatest } from "@/data/posts";
import { PostCard } from "@/components/PostCard";

export default function Home() {
  const latest = getLatest(4);
  return (
    <div className="space-y-6">
      <HeroHeader title="Crane.news" subtitle="Local news, events, and media for Crane, Missouri." />
      <section className="card p-6 md:p-8">
        <AlertBar variant="gold" text="This is a community-run site. Not affiliated with the City of Crane." />
        <h2 className="text-lg font-semibold mt-6">Latest</h2>
        <div className="mt-3 grid md:grid-cols-2 gap-4">
          {latest.map(p => <PostCard key={p.slug} {...p} />)}
        </div>
      </section>
    </div>
  );
}
